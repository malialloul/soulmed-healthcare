import React from "react";
import {  Route, Routes, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./css/landing-page.css";
import "./css/nav-bar.css";
import Home from "./views/home";
import ProductsMainPage from "./views/products/main-page";
import Product from "./views/products/product";

import { useTranslation } from "react-i18next";

const App = () => {
  const [t, i18n] = useTranslation("common");

  return (
    <div dir={i18n.language === "en" ? "ltr" : "rtl"}>
      <BrowserRouter history={createBrowserHistory}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/products" element={<ProductsMainPage />} />
          <Route exact path="/products/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
