// GenericEditProfile.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const GenericEditProfile = ({
  title,
  fetchProfile,
  onSubmit,
  readOnlyFields = [],
  editableFields = [],
}) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile().then((data) => {
      setFormData(data);
      if (data.photo) setImagePreview(data.photo);
    });
  }, [fetchProfile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;

    if (formData.city && !nameRegex.test(formData.city.trim())) {
      toast.error('City must contain only alphabets');
      return false;
    }
    if (formData.state && !nameRegex.test(formData.state.trim())) {
      toast.error('State must contain only alphabets');
      return false;
    }
    if (formData.country && !nameRegex.test(formData.country.trim())) {
      toast.error('Country must contain only alphabets');
      return false;
    }
    if (formData.adrLine1 && !nameRegex.test(formData.adrLine1.trim())) {
      toast.error('Address Line 1 must contain only alphabets');
      return false;
    }
    if (formData.adrLine2 && !nameRegex.test(formData.adrLine2.trim())) {
      toast.error('Address Line 2 must contain only alphabets');
      return false;
    }
    if (formData.pincode && !pincodeRegex.test(formData.pincode)) {
      toast.error('Pin Code must be 6 digits');
      return false;
    }
    if (formData.mobileNo && !mobileRegex.test(formData.mobileNo.trim())) {
      toast.error('Mobile number must be 10 digits');
      return false;
    }

    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedData = {};
    editableFields.forEach(({ key }) => {
      updatedData[key] = formData[key];
    });
    
    const result = await onSubmit(updatedData);
    if (result.status == 200) {
      toast.success(result.data.message);
    } else {
      toast.error(result.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">{title}</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {readOnlyFields.map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                value={formData[key] || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
            </div>
          ))}

          {editableFields.map(({ label, key, icon, type = 'text' }) => (
            <div key={key}>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                {icon} {label}
              </label>
              <input
                type={type}
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          ))}
        </form>

        <div className="mt-6 flex gap-4 justify-end">
          {/* <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Update Request
          </button> */}
          <button
            type="reset"
            onClick={() => window.location.reload()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericEditProfile;
