import { userContoller } from "../controllers/user-controller";

const registerUser = (data) => {
  let userData = {
    birthdate: data.birthdate,
    email: data.email,
    firstname: data.firstname,
    gender: {
      costumGenderName: data.costumGenderName,
      genderName:
        data.gender1 !== null
          ? "MALE"
          : data.gender2 !== null
          ? "FEMALE"
          : "CUSTOM",
      promoun: data.promoun,
    },
    lastname: data.lastname,
    password: data.password,
    phoneNumber: data.phoneNumber,
  };
  return userContoller.registerUser(userData).then((response) => {
    return response;
  });
};

const loginUser = (userData) => {
  return userContoller.loginUser(userData).then((response) => {
    return response;
  });
};

export const userService = { registerUser, loginUser };
