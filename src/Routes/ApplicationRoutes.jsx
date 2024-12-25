import React from "react";
import { ApplicationState } from "../Context/ApplicationState";
import JobApplicationForm from "../JobApplicationForm/JobApplicationform";
import GenerateToken from "../GenerateToken/GenerateToken";
import { ApplicationContext } from "../Context/Applicationcontext";

const ApplicationRoutes = () => {
    return (
        <ApplicationState>
            <ApplicationContext.Consumer>
                {({ isJobApplicationFormVisible }) =>
                    isJobApplicationFormVisible ? <JobApplicationForm /> : <GenerateToken />
                }
            </ApplicationContext.Consumer>
        </ApplicationState>
    );
};

export default ApplicationRoutes;
