import React, { useContext, useState } from "react";
import "./JobApplication.css"
import {
    Card,
    Tabs,
    Button,
    Form,
    Select,
    Col,
    Typography,
    Input,
    InputNumber,
    Row,
    notification,
    Spin
} from 'antd';
import { ApplicationContext } from "../Context/Applicationcontext";

const JobApplicationForm = () => {
    const { toggleScreen, token, loading, generateToken } = useContext(ApplicationContext);
    const { TabPane } = Tabs;
    const { Option } = Select;
    const { Text, Title } = Typography;
    const [tokenNumber, setTokenNumber] = useState(null);

    const onFinish = values => {
        console.log('Form values:', values);
        addJobApplication(values)

    };
    const addJobApplication = async data => {

        const {
            department,
            position,
            fullName,
            contactNumber,
            currentLocation,
            permanentLocation,
            qualification,
            experience,
            reference,
            noticePeriod,
        } = data;
        // if (contactNumber) {
        //     generateToken(contactNumber);
        // }
        const requestBody = {
            departement: department,
            position,
            fullName,
            contact: contactNumber,
            currentLocation,
            permanentLocation,
            latestQualification: qualification,
            totalExperiences: experience,
            reference,
            noticePeriod,
        };
        console.log("requestbody", requestBody);

        try {
            const response = await fetch(`https://napi.prepseed.com/hightech/addJobApplication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            // if (response.ok) {
            //     const responseData = await response.json();
            //     const receivedToken = responseData?.jobApplication?.token;
            //     setTokenNumber(receivedToken);

            //     notification.success({
            //         message: 'Success',
            //         description: responseData?.message || 'Submitted Successfully!',
            //     });
            //     console.log('Application Submitted Successfully:', responseData);
            // } else {
            //     const data = await response.json()
            //     notification.error({ message: data?.message })
            //     console.error('Error adding job application:', response.statusText);
            // }
            if (response.ok) {
                const responseData = await response.json();
                const receivedToken = responseData?.jobApplication?.token;
                setTokenNumber(receivedToken);

                // Custom success message
                notification.success({
                    message: 'Submitted',
                    description: `Job Application Submitted Successfully.`,
                });

                console.log('Application Submitted Successfully:', responseData);
            } else {
                const data = await response.json();

                // Custom error message
                notification.error({
                    message: 'Submission Failed',
                    description: data?.message || 'An error occurred while submitting your application. Please try again later.',
                });

                console.error('Error adding job application:', response.statusText);
            }
        } catch (error) {
            console.error('Request failed', error);
        }
    };
    return (
        <>
            <section id="JobApplicationFormContainer">
                <div className="BackBannerContainer">
                    <img src="/BackBanner.png" alt="" />
                </div>
                <div
                    className="ApplicationFormContainer"
                    style={{
                        // backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        height: "100%"
                    }}
                >

                    <Form
                        onFinish={onFinish}
                        layout="vertical"
                        style={{
                            // maxWidth: '800px',
                            margin: '0 auto',
                            // padding: '20px',
                            height: "100%",
                        }}
                    >
                        <div className="Formheader">
                            <div className="headerLogo">
                                <img src="/hitech_logo.png" alt="" />
                            </div>
                            <br />
                            <Title level={2} style={{ textAlign: 'center', color: '#0d2e61', marginBottom: "0px" }}>
                                Job Application Form
                            </Title>
                            <Text
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    // color: '#888',
                                }}
                            >
                                Please complete the form to apply for the position.
                            </Text>

                        </div>
                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="department"
                                    label="Which Department are you Applying for?"
                                    rules={[{ required: true, message: 'Please select a Department!' }]}
                                >
                                    <Select
                                        placeholder="Select Department"

                                        style={{
                                            width: '100%',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            // border: '1px solid #d9d9d9',
                                        }}
                                    >
                                        <Option value="hr">HR</Option>
                                        <Option value="engineering">Engineering</Option>
                                        <Option value="marketing">Marketing</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="position"
                                    label="What Position are you Applying for?"
                                    rules={[{ required: true, message: 'Please enter the Position!' }, {
                                        // Disallow special characters and multiple consecutive spaces
                                        pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                        message: 'Special characters and spaces are not allowed!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (/^[a-zA-Z][a-zA-Z ]*$/.test(value) && !/\d/.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Names cannot include numbers or spaces!'));
                                        },
                                    },]}
                                >
                                    <Input
                                        placeholder="Enter Position"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="fullName"
                                    label="What is your Full Name?"
                                    rules={[{ required: true, message: 'Please enter your Full Name!' }, {
                                        // Disallow special characters and multiple consecutive spaces
                                        pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                        message: 'Special characters and spaces are not allowed!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (/^[a-zA-Z][a-zA-Z ]*$/.test(value) && !/\d/.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Names cannot include numbers or spaces!'));
                                        },
                                    },]}
                                >
                                    <Input
                                        placeholder="Enter Full Name"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="contactNumber"
                                    label="What is your Contact Number?"
                                    rules={[
                                        { required: true, message: 'Please enter your Contact Number!' },
                                        { pattern: /^[0-9]{10}$/, message: 'Contact number must be a 10-digit number!' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter Contact Number"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="currentLocation"
                                    label="Where are you Currently Located?"
                                    rules={[
                                        { required: true, message: 'Please enter your Current Location!' },
                                        {
                                            // Disallow special characters and multiple consecutive spaces
                                            pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                            message: 'Special characters and spaces are not allowed!',
                                        },

                                    ]}
                                >
                                    <Input
                                        placeholder="Enter Current Location"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="permanentLocation"
                                    label="What is your Permanent Location?"
                                    rules={[
                                        { required: true, message: 'Please enter your Permanent Location!' },
                                        {
                                            // Disallow special characters and multiple consecutive spaces
                                            pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                            message: 'Special characters and spaces are not allowed!',
                                        },

                                    ]}
                                >
                                    <Input
                                        placeholder="Enter Permanent Location"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="qualification"
                                    label="What is your Highest Qualification?"
                                    rules={[
                                        { required: true, message: 'Please enter your Qualification!' },
                                        {
                                            // Disallow special characters and multiple consecutive spaces
                                            pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                            message: 'Special characters and spaces are not allowed!',
                                        },

                                    ]}
                                >
                                    <Input
                                        placeholder="Enter Qualification"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="experience"
                                    label="How many years of Experience do you have?"
                                    rules={[
                                        { required: true, message: 'Please enter your Experience!' },
                                        { type: 'number', min: 0, message: 'Experience must be a positive number!' },

                                    ]}

                                >
                                    <InputNumber
                                        min={0}
                                        placeholder="Enter years of Experience"
                                        style={{
                                            // padding: '8px 12px',
                                            width: '100%',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="reference"
                                    label="How did you hear About Us? (e.g., Friend, Agency)"
                                    rules={[{ required: true, message: 'Please enter a Reference!' }, {
                                        // Disallow special characters and multiple consecutive spaces
                                        pattern: /^(?!.* {2})[a-zA-Z0-9 ]*$/,
                                        message: 'Special characters and spaces are not allowed!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (/^[a-zA-Z][a-zA-Z ]*$/.test(value) && !/\d/.test(value)) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Names cannot include numbers or spaces!'));
                                        },
                                    },]}
                                >
                                    <Input
                                        placeholder="Enter Reference"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col lg={12} md={24} style={{ width: "100%" }}>
                                <Form.Item
                                    name="noticePeriod"
                                    label="What is your Notice Period?"
                                    rules={[
                                        { required: true, message: 'Please enter your Notice Period!' },
                                        { pattern: /^[0-9]+$/, message: 'Notice period must be a numeric value!' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Enter Notice Period"
                                        style={{
                                            // padding: '8px 12px',
                                            // backgroundColor: '#f6f8fb',
                                            borderRadius: '4px',
                                            border: '1px solid #d9d9d9',
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <br /><br />

                        <div className="SubmitBtnContainer">
                            <div className="FooterBtn">
                                <Form.Item style={{ margin: "0px" }}>
                                    <Row justify="center">
                                        <Button type="primary" htmlType="submit" >
                                            Submit Application
                                        </Button>
                                    </Row>
                                </Form.Item>
                                <a onClick={toggleScreen} style={{ color: "#0d2e61", textAlign: "center", cursor: "pointer" }}>Already submitted? Click here!</a>
                            </div>
                            
                        </div>

                        <br />
                        {loading ? (
                                <Spin tip="Generating your token number..." size="large" />
                            ) : tokenNumber ? (
                                <div className="tokenDisplay">
                                    <h1>Your Token Number is: {tokenNumber}</h1>
                                </div>
                            ) : null}
                    </Form>

                </div>
            </section>
        </>
    )
}
export default JobApplicationForm