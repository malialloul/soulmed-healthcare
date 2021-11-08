import React, { useEffect, useState } from "react";
import SearchModel from "../components/search-model";
import LoginModel from "../components/login-model";
import { welcomeConroller } from "../controllers/welcome-page";
import SearchModal from "../components/search-model";
import NavBar from "../components/nav-bar";
import SliderComponent from "../components/slider-component";
import Services from "../components/services";
import AdvisoryBoard from "../components/advisory-board";
import Footer from "../components/footer";

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    welcomeConroller.getAllCategories().then((response) => {
      setCategories(response.data);
    });
  }, []);


  return (
    <div>
      <NavBar selectedTab="home" />
      <br />
      <div className="body">
        <LoginModel/>
        <SearchModal
          categories={categories}
          doctorsData={[]}
          productsData={[]}
        />
        <br />
        <br />
        <br />
        <SliderComponent />
        <br />
        <br />
        <Services />

        <br />
        <br />
        <AdvisoryBoard />
        <br />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
