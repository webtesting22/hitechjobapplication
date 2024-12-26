// ApplicationState.js
import React, { useState } from "react";
import { ApplicationContext } from "./Applicationcontext";
import { notification } from "antd";
export const ApplicationState = ({ children }) => {
    const [isJobApplicationFormVisible, setJobApplicationFormVisible] = useState(true);
    const [token, setToken] = useState(null);  // State for token
    const [loading, setLoading] = useState(false);  // State for loading

    // Function to toggle between the two screens
    const toggleScreen = () => {
        setJobApplicationFormVisible((prev) => !prev);
    };

    // Function to set the token and loading state
    const generateToken = (mobileNumber) => {
        setLoading(true);
    
        // Log the mobile number being passed to the API
        console.log(`Generating token for mobile number: ${mobileNumber}`);
    
        fetch(`https://napi.prepseed.com/hightech/getTokenFromContact?contact=${mobileNumber}`)
            .then((response) => {
                // Check for response status and log the response
                console.log('API Response Status:', response.status);
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setToken(data.token);
                } else {
                    notification.error({
                        message: 'Token Generation Failed',
                        description: data.message || 'Failed to generate token.',
                    });
                    console.error('Error response:', data);
                }
            })
            .catch((error) => {
                notification.error({
                    message: 'Error',
                    description: 'An error occurred while fetching the token.',
                });
                console.error('Fetch error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    

    return (
        <ApplicationContext.Provider
            value={{
                isJobApplicationFormVisible,
                toggleScreen,
                token,
                loading,
                generateToken,  // Provide generateToken function in context
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};
