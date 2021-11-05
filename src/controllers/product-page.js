import axios from "axios";
import Geocode from "react-geocode";
import configData from "../configData.json";

const SERVER_URL = "localhost";
const SERVER_PORT = "5000";

const apiURL = "http://" + SERVER_URL + ":" + SERVER_PORT;

const getProducts = () => {
  return axios.get(apiURL + "/products");
};

const getProduct = (productId) => {
  return axios.get(apiURL + "/products?id="+productId)
}

export const productsController = { getProducts, getProduct };
