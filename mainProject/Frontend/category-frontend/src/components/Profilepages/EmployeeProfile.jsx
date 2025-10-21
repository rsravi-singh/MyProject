import React, { useEffect, useState } from 'react';
import GenericProfile from './GenericProfile';
import { getEmployeeProfileById } from '../../services/userService';

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getEmployeeProfileById();
          console.log("Fetched profile data:", data);
  
          setProfile({
            fullName: data.firstName+ " "+data.lastName,
            dob: data.dob,
            gender: data.gender,
            photoId: data.govtIdType,
            govtId: data.govtId,
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

  const fields = [,
    { label: 'Name', value: profile.fullName },
    { label: 'DOB', value: profile.dob },
    { label: 'Gender', value: profile.gender },
    { label: 'Govt ID', value: profile.govtId },
    { label: 'Photo ID', value: profile.photoId },
    { label: 'Phone', value: profile.mobile },
    { label: 'Email', value: profile.email },
    { label: 'Status', value: profile.status },
  ];

  return (
    <GenericProfile
      title="Employee Profile"
      fields={fields}
      photo={profile.photo}
    />
  );
};

export default EmployeeProfile;
