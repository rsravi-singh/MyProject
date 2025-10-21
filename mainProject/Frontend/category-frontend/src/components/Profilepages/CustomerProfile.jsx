import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';
import { getCustomerProfileById } from '../../services/userService';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCustomerProfileById();
        console.log("Fetched profile data:", data);

        setProfile({
          fullName: data.fullName,
          userName: data.userName,
          dob: data.dateOfBirth,
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
          mobile: data.phoneNumber,
          email: data.email,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); // Call the async function
  }, []);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const fields = [
    { label: 'Full Name', value: profile.fullName },
    { label: 'Date of Birth', value: profile.dob },
    { label: 'Gender', value: profile.gender },
    { label: 'Nationality', value: profile.nationality },
    { label: 'Photo ID', value: profile.photoId },
    { label: 'Mobile', value: profile.mobile },
    { label: 'Email', value: profile.email },
    { label: 'Status', value: profile.status },
    { label: 'Address Line 1', value: profile.adrLine1 },
    { label: 'Address Line 2', value: profile.adrLine2 },
    { label: 'City', value: profile.city },
    { label: 'State', value: profile.state },
    { label: 'Country', value: profile.country },
    { label: 'Pin Code', value: profile.pincode },
  ];


  return (
    <GenericProfile
      title="Customer Profile"
      fields={fields}
      photo={profile.photo}
    />
  );
};

export default CustomerProfile;
