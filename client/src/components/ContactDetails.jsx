import React, { useState, useEffect } from "react";
import "./ContactDetails.css";
import axios from "axios";

const ContactDetails = (props) => {
  const [contactInfo, setContactInfo] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(
          `https://book-swapping-platform.vercel.app:3000/books/${props.info}`
        );
        const { owner, contactNumber, address } = response.data;
        setContactInfo(owner);
        setContactNumber(contactNumber);
        setAddress(address);
      } catch (error) {
        console.error("Failed to fetch contact info: ", error);
      }
    };
    fetchContactInfo();
  }, [props.info]);

  return (
    <div className="contact-details">
      <h3>Contact Details</h3>
      {contactInfo && (
        <>
          <h2>Owner: {contactInfo}</h2>
          <p>Phone Number: {contactNumber}</p>
          <p>Address: {address}</p>
        </>
      )}
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default ContactDetails;
