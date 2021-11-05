import React, { useState } from "react";
import { Link, Route, Routes, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import logo from "./logo.png";
import "./css/landing-page.css";
import "./css/nav-bar.css";
import Home from "./views/home";
import ProductsMainPage from "./views/products/main-page";
import Product from "./views/products/product";

import { useTranslation } from "react-i18next";

const App = () => {
  const [t, i18n] = useTranslation("common");

  return (
    <html dir={i18n.language === "en" ? "ltr" : "rtl"}>
     
      <body>
        <BrowserRouter history={createBrowserHistory}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<ProductsMainPage />} />
            <Route exact path="/products/:productId" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </body>
    </html>
  );
};

export default App;
