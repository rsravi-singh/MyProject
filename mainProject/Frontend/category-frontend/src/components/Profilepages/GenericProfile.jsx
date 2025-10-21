import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenericProfile = ({ title, fields, photo }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 border-b pb-2">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        {fields.map((field, index) => (
          <div key={index} className={field.fullWidth ? 'md:col-span-2' : ''}>
            <strong>{field.label}:</strong> {field.value}
          </div>
        ))}

        {photo && (
          <div className="md:col-span-2">
            <img
              src={`data:image/png;base64,${photo}`}
              alt="Profile"
              className="w-40 h-40 object-cover rounded shadow border"
            />
          </div>
        )}
      </div>

      {/* {onEdit && (
        <div className="mt-6 text-right">
          <button
            onClick={() => navigate(onEdit)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      )} */}
    </div>
  );
};

export default GenericProfile;
