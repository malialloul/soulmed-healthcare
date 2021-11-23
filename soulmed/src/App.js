import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./css/landing-page.css";
import "./css/nav-bar.css";
import Home from "./views/home";
import ProductsMainPage from "./views/products/main-page";
import Product from "./views/products/product";
import AdvancedSearch from "./views/advanced-search";
import WokrWithUs from "./views/work-with-us";
import ViewProfile from "./views/view-profile";
import { useTranslation } from "react-i18next";
import DoctorDashboard from "./views/doctor/doctor-dashboard";
import ScheduleSettings from "./views/doctor/schedule-settings";
import CategoryProducts from "./views/products/category-products";
import axios from 'axios'

const App = () => {
  const [t, i18n] = useTranslation();


  return (
    <div dir={i18n.language === "en" ? "ltr" : "rtl"}>
      <BrowserRouter history={createBrowserHistory}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/work-with-us" element={<WokrWithUs />} />
          <Route exact path="/view-profile/:id" element={<ViewProfile />} />
          <Route exact path="/doctor/schedule-settings/:id" element={<ScheduleSettings />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/products" element={<ProductsMainPage />} />
          <Route exact path="/products/:productId" element={<Product />} />
          <Route exact path="/products/category/:categoryId" element={<CategoryProducts />} />

          <Route
            exact
            path="/advanced-search/:categoryId/:professionId/:searchText"
            element={<AdvancedSearch />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
