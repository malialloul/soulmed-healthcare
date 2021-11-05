import axios from "axios";
import Geocode from "react-geocode";
import configData from "../configData.json";

const SERVER_URL = "localhost";
const SERVER_PORT = "5000";

const apiURL = "http://" + SERVER_URL + ":" + SERVER_PORT;

const getDoctorsData = ({ _start = 0, _length = 10 }) => {
  return axios
    .get(apiURL + "/doctor?_start=" + _start + "&_end=" + _length)
    .then((res) => {
      return res;
    });
};

const getAllCategories = () => {
  return axios.get(apiURL + "/categories");
};

const getAllProvisions = () => {
  return axios.get(apiURL + "/provision");
};

const getInfoByQuery = (query) => {
  return axios.get(apiURL + "/info?" + query);
};

const getProvisionByCategory = (category_id) => {
  return axios.get(
    apiURL +
      "/provision" +
      (category_id !== 0 ? "?category_fk=" + category_id : "")
  );
};

const getProvision = (provision_fk) => {
  console.log(
    apiURL +
      "/provision" +
      (provision_fk !== -1 ? "?id=" + provision_fk : "")
  );
  return axios.get(
    apiURL +
      "/provision" +
      (provision_fk !== -1 ? "?id=" + provision_fk : "")
  );
};

const getCategory = (category_id) => {
  return axios
    .get(
      apiURL + "/categories" + (category_id !== 0 ? +"?id=" + category_id : "")
    )
    .then((response) => {
      return response;
    });
};

const getInfoByProvision = (provision_id) => {
  return axios.get(
    apiURL +
      "/info" +
      (provision_id !== -1 ? "?provision_fk=" + provision_id : "")
  );
};

const getCurrentLocation = async () => {
  const myLocation = {
    district: "",
    state: "",
  };
  navigator.geolocation.getCurrentPosition(function (position) {
    const my_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    Geocode.fromLatLng(my_location.lat, my_location.lng).then(
      (response) => {
        for (
          var i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            var b = 0;
            b < response.results[0].address_components[i].types.length;
            b++
          ) {
            if (
              response.results[0].address_components[i].types[b] ===
              "administrative_area_level_2"
            ) {
              var city = response.results[0].address_components[i];

              myLocation.district = city.long_name;
              break;
            }
          }
        }

        for (
          var i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            var b = 0;
            b < response.results[0].address_components[i].types.length;
            b++
          ) {
            if (
              response.results[0].address_components[i].types[b] ===
              "administrative_area_level_1"
            ) {
              var state = response.results[0].address_components[i];
              myLocation.state = state.long_name;

              break;
            }
          }
        }
        return myLocation;
      },
      (error) => {
        console.error(error);
      }
    );
  });
};

export const welcomeConroller = {
  getDoctorsData,
  getCurrentLocation,
  getAllCategories,
  getProvisionByCategory,
  getProvision,
  getCategory,
  getInfoByProvision,
  getAllProvisions,
  getInfoByQuery,
};
