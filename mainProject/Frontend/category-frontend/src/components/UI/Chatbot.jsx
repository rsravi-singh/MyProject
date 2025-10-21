import React, { useState } from "react";
import axios from "axios";
import { config } from "../../config";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const predefinedQuestions = [
    { text: "What are today's loan rates?", endpoint: "/loan-rates" },
    { text: "Show me FD rates", endpoint: "/fd-rates" },
  ];

  const handleQuestionClick = async (question) => {
    setMessages([...messages, { from: "user", text: question.text }]);

    try {
      const res = await axios.get(
        `${config.serverURL}/home${question.endpoint}`
      );
      const data = res.data;
      const responseText = data.rates.join("\n");

      setMessages((prev) => [...prev, { from: "bot", text: responseText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong!" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        className="bg-[#003366] hover:bg-[#0059b3] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {isOpen && (
        <div className="bg-white w-80 h-96 p-4 rounded-xl shadow-xl mt-2 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    msg.from === "user" ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div>
            {predefinedQuestions.map((q, i) => (
              <button
                key={i}
                className="block w-full text-left bg-gray-100 px-3 py-2 mb-1 rounded hover:bg-gray-200"
                onClick={() => handleQuestionClick(q)}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
