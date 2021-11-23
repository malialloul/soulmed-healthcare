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
  return axios.get(apiURL + "/products?id=" + productId);
};

const getProductsCategoryId =  () => {
  return  axios
    .get(apiURL + "/categories?name=Products")
    

};

const getCategoryProduct = async (category_fk) => {
  return await axios.get(apiURL + "/products?profession_fk="+category_fk);
}

const getCategories = (category_fk) => {
  return  axios.get(apiURL + "/profession?category_fk="+category_fk);

}

const getCategory = (categoryId) => {
  return  axios.get(apiURL + "/profession?id="+categoryId);

}

export const productsController = { getProducts, getProduct,getProductsCategoryId,getCategoryProduct, getCategories,getCategory };
