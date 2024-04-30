import React, { useEffect, useState } from 'react';
import PackageCard from './PackageCard';
import axios from 'axios';
import './MyProfile.css';
import BannerComponent from './Banner';
import ProfileBanner from '../../images/profile.jpg';

const MyProfile = () => {
  const [packages, setPackages] = useState([]);
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem('userID');
  const fetchPackages = () => {
    axios
      .get(`http://localhost:8080/package/${userId}`)
      .then((response) => {
        // Handle the received data here
        const packages = response.data;
        setPackages(packages);
        console.log(packages);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  };

  const fetchUser = () => {
    axios
      .get(`http://localhost:8080/api/users/${userId}`)
      .then((response) => {
        // Handle the received data here
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchPackages();
  }, []);

  return (
    <div>
      <BannerComponent heading="Profile" banner={ProfileBanner} />
      <div style={{padding: '2rem'}}>
        <h2>User Details</h2>
        <h4>Username: {user.userName}</h4>
        <h4>User Email: {user.email}</h4>
      </div>
      {packages.length > 0 ? (
        <div>
          <h2 style={{padding: '2rem'}}>
            Admin has sent you these packages
          </h2>

          <div className="package-grid">
            {packages.map((item) => (
              <PackageCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>No packages</div>
      )}
    </div>
  );
};

export default MyProfile;
