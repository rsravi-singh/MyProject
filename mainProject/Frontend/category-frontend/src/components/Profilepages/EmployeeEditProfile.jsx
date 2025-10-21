import React from 'react';
import GenericEditProfile from './GenericEditProfile';
import { Mail, Phone, MapPin } from 'lucide-react';

const EmployeeEditProfile = () => {
  // Dummy fetch function
  const getEmployeeProfile = async () => {
    return {
      fullName: 'Amit Sharma',
      dateOfBirth: '1995-04-15',
      gender: 'Male',
      nationality: 'Indian',
      photoId: 'EMP12345',
      mobileNo: '9876543210',
      email: 'amit.sharma@company.com',
      photo: 'src/assets/Images/employee.png',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      pinCode: '411001',
    };
  };

  // Dummy submit function
  const updateEmployeeProfile = async (updatedData) => {
    console.log('Updated Employee Data:', updatedData);
    return { success: true, message: 'Employee profile updated successfully' };
  };

  return (
    <GenericEditProfile
      title="Update Employee Profile"
      fetchProfile={getEmployeeProfile}
      onSubmit={updateEmployeeProfile}
      readOnlyFields={[
        { label: 'Full Name', key: 'fullName' },
        { label: 'Date of Birth', key: 'dateOfBirth' },
        { label: 'Gender', key: 'gender' },
        { label: 'Nationality', key: 'nationality' },
      ]}
      editableFields={[
        { label: 'Email', key: 'email', icon: <Mail size={16} />, type: 'email' },
        { label: 'Mobile No.', key: 'mobileNo', icon: <Phone size={16} /> },
        { label: 'Photo ID', key: 'photoId' },
        { label: 'City', key: 'city', icon: <MapPin size={16} /> },
        { label: 'State', key: 'state' },
        { label: 'Country', key: 'country' },
        { label: 'Pin Code', key: 'pinCode' },
      ]}
    />
  );
};

export default EmployeeEditProfile;
