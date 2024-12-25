// GenerateToken.js
import React, { useState, useContext } from "react";
import { ApplicationContext } from "../Context/Applicationcontext";
import { Input, Button, message } from "antd";
import "./GenerateToken.css";

const GenerateToken = () => {
    const { toggleScreen, token, loading, generateToken } = useContext(ApplicationContext);
    const [mobileNumber, setMobileNumber] = useState(""); // State to hold mobile number input

    // Function to handle mobile number change
    const handleMobileChange = (e) => {
        setMobileNumber(e.target.value);
    };

    // Function to validate the mobile number
    const isValidMobile = (number) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(number);
    };

    // Function to handle generate token button click
    const handleGenerateToken = () => {
        if (!isValidMobile(mobileNumber)) {
            message.error("Please enter a valid mobile number.");
            return;
        }

        generateToken(mobileNumber);  // Call the generateToken from context
    };

    return (
        <section id="GenerateTokenContainer">
            <div className="BackBannerContainer">
                <img src="/BackBanner.png" alt="Back Banner" />
            </div>
            <div style={{ zIndex: "555", position: "sticky" }}>
                <div className="headerLogo">
                    <img src="/hitech_logo.png" alt="Logo" />
                </div>
                <br /><br />
                <div className="ScreenContainer">
                    <Input
                        placeholder="Enter Mobile Number"
                        type="number"
                        value={mobileNumber}
                        onChange={handleMobileChange}
                        style={{width:"350px"}}
                    />
                    <br />
                    <Button loading={loading} onClick={handleGenerateToken}>
                        View Token
                    </Button>
                    <br />
                    {token && (
                        <div className="tokenDisplay">
                            <h1>Your Token  Number is: {token}</h1>
                        </div>
                    )}
                    <a onClick={toggleScreen} style={{ color: "#0d2e61",textAlign:"center",cursor:"pointer"}}>Back to Job Application</a>
                </div>
                <br />
                <br />
                
            </div>
        </section>
    );
};

export default GenerateToken;
