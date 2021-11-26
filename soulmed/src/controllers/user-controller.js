import axios from "axios";


const apiURL = "http://" + process.env.REACT_APP_API_BASE_URL + "/api/user/v1";

const registerUser = (body) => {
  return axios.post(apiURL + "authenticate/register", body);
};

const loginUser = async (body) => {

  const headers = {
    accept: "application/json",
    APP_ID: process.env.REACT_APP_API_APP_ID,
    "Access-Control-Allow-Origin": "*",
    'Content-Type' : 'application/json',
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    crossdomain: true,
    crossDomain: true
  };

  return await axios({
    method: "post",
    url: "/authenticate",
    baseURL: apiURL,
    data: body,
    withCredentials: false,
    headers: headers,
  }).then((response) => {
    return response;
  });
};

export const userContoller = { registerUser, loginUser };
