import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { sendMoney } from '../../services/userService';

const MoneyTransfer = () => {
  const [formData, setFormData] = useState({
    toAccount: '',
    accountHolderName: '',
    amount: '',
    description: '',
    transactionMode: 'ACCOUNTTRANSFER',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = (payload) => {
    if (!payload.toAccount || isNaN(payload.toAccount)) {
      toast.error('Valid account number is required.');
      return false;
    }

    if (!payload.accountHolderName || payload.accountHolderName.trim() === '') {
      toast.error('Account Holder Name is required.');
      return false;
    }

    if (!payload.amount || isNaN(payload.amount) || payload.amount < 1) {
      toast.error('Amount must be at least 1.');
      return false;
    }

    if (!payload.description || payload.description.trim() === '') {
      toast.error('Description is required.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      receiverAccount: Number(formData.toAccount),
      amount: parseFloat(formData.amount),
    };

    if (!validate(payload)) return;

    try {
      const res = await sendMoney(payload);
      console.log(res)
      console.log('Transaction success:', res.data.message);
      toast.success('Transfer successful!');
      setFormData({
        toAccount: '',
        accountHolderName: '',
        amount: '',
        description: '',
        transactionMode: 'ACCOUNTTRANSFER',
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      console.log(error.res?.data?.message || 'Transfer failed.');
    }
  };

  const handleCancel = () => {
    setFormData({
      toAccount: '',
      accountHolderName: '',
      amount: '',
      description: '',
      transactionMode: 'ACCOUNTTRANSFER',
    });
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 max-w-xl mx-auto font-sans mt-10 text-[#0B2E53] border border-[#0B2E53]/10">
      <h1 className="text-2xl font-semibold text-[#0B2E53] mb-6 text-center">Money Transfer</h1>

      <div className="mb-6 border border-[#0B2E53] rounded-lg p-4">
        <div className="mb-4">
          <label className="block font-medium mb-1">To Account No.</label>
          <input
            type="text"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
            placeholder="Enter account number"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
            placeholder="Enter account holder name"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Remark</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-[#0B2E53] rounded"
            placeholder="Enter description"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-[#0B2E53] text-white px-6 py-2 rounded hover:bg-[#C89D2A] transition"
        >
          Transfer Now
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MoneyTransfer;