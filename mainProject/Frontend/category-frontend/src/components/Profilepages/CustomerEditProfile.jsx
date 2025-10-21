import React, { useEffect, useState } from 'react';
import GenericEditProfile from './GenericEditProfile';
import { MapPin, Phone, Mail, Image } from 'lucide-react';
import { getCustomerProfileById, updateCustomerProfileById } from '../../services/userService';

const CustomerEditProfile = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await getCustomerProfileById();
      console.log("Fetched profile data:", data);

      setProfile({
        fullName: data.fullName,
        userName: data.userName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality,
        photoId: data.photoId,
        photo: data.photo,
        adrLine1: data.adrLine1,
        adrLine2: data.adrLine2,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
        mobileNo: data.phoneNumber, // ensure this key matches editable field
        email: data.email,
        status: "Active",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateCustomerProfile = async (formData) => {
    console.log("Submitted data:", formData);
    const userId = 1; // dynamically set this if needed
    const result = await updateCustomerProfileById(userId, formData);
    return result;
  };

  if (!profile) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }

  return (
    <GenericEditProfile
      title="Update Customer Profile"
      fetchProfile={() => Promise.resolve(profile)}
      onSubmit={updateCustomerProfile}
      readOnlyFields={[
        { label: "Full Name", key: "fullName" },
        { label: "Date of Birth", key: "dateOfBirth" },
        { label: "Gender", key: "gender" },
        { label: "Nationality", key: "nationality" },
        { label: "Photo ID", key: "photoId", icon: <Image /> },
        { label: "Email", key: "email", icon: <Mail />, type: "email" },
      ]}
      editableFields={[
        { label: "Address Line 1", key: "adrLine1", icon: <MapPin /> },
        { label: "Address Line 2", key: "adrLine2", icon: <MapPin /> },
        { label: "City", key: "city", icon: <MapPin /> },
        { label: "State", key: "state", icon: <MapPin /> },
        { label: "Country", key: "country", icon: <MapPin /> },
        { label: "Pin Code", key: "pincode", icon: <MapPin /> },
        { label: "Mobile No", key: "mobileNo", icon: <Phone /> },
      ]}
    />
  );
};

export default CustomerEditProfile;
