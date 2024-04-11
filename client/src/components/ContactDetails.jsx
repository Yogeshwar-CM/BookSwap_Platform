// ContactDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactDetails = ({ userId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details: ", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="contact-details">
      <h3>Contact Details</h3>
      {userDetails && (
        <div>
          <p>Address: {userDetails.address}</p>
          <p>Phone Number: {userDetails.phoneNumber}</p>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ContactDetails;
