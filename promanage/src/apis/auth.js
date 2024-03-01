import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({ name, email, password }) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/auth/register`;
        console.log('Request URL:', reqUrl); 
        const reqPayload = { name, email, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        // toast with custom message for clients
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/api/v1/auth/login`;
        console.log('Request URL:', reqUrl); 
        const reqPayload = { email, password };
        const response = await axios.post(reqUrl, reqPayload);
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
};