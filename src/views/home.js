import React, { useEffect, useState } from "react";
import SearchModel from "../components/search-model";
import LoginModel from "../components/login-model";
import { welcomeConroller } from "../controllers/welcome-page";
import SearchModal from "../components/search-model";
import NavBar from "../components/nav-bar";
import SliderComponent from "../components/slider-component";
import Services from "../components/services";
import QuickAccess from "../components/quick-access";
import Footer from "../components/footer";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [registerSubmit, setRegisterSubmit] = useState(false);
  useEffect(() => {
    welcomeConroller.getAllCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar selectedTab="home" onSubmit = {() => setRegisterSubmit(true)} />
      <div className="d-flex justify-content-center">
      {registerSubmit && (
    <div className="d-flex align-items-center justify-content-center col-md-8 verification">
    Please verify your address in order to proceed, if you still didn't
          receive any email, <a href="#">click here</a>
        </div>
      )}
      </div>
      <br/>
      <SearchModel
          categories={categories}
          doctorsData={[]}
          productsData={[]}
        />{" "}
      <br />
      <div className="body">
        <br />
        <br />
        <QuickAccess />
        <br />
      
        <br />
        <Services />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
