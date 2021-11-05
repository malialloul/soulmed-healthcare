import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsController } from "../../controllers/product-page";
import "../../css/products-main.css";
import DownChevron from "../../icons/down-chevron";
import Close from "../../icons/close";

import {
  ReactiveBase,
  RangeSlider,
  SelectedFilters,
  ResultList,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import SliderRange from "../../inputs/slider-range";
import classNames from "classnames";
import ProductsCustomPagination from "../../inputs/products-custom-pagination";
import NavBar from "../../components/nav-bar";

const Product = ({ ...props }) => {
  let { productId } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1);
  const [categorySelected, setCategorySelected] = useState(-1);
  const categories = [
    "Remote Patient Monitoring",
    "Prosthodontics",
    "Virtual Examination Room",
  ];

  useEffect(() => {
    productsController.getProducts().then((response) => {
      setProductsList(response.data);

      let max = 0;
      response.data.map((pr, i) => {
        if (pr > max) {
          max = pr;
        }
      });
      setMaxPrice(max);
    });
  },[]);

  return (
    <>
      <NavBar />

      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
         

          <div className="col-10">
            <input
              type="text"
              placeholder="Search: Place Holder: Company name, Device name , category of this devices"
              className="product-search-input"
            />
          </div>
        </div>
        <br />
        <div className="category-filter d-flex justify-content-between">
          <div className="categories-div d-flex align-items-center">
            {categories.map((category, i) => {
              return (
                <div className="d-flex align-items-center justify-content-start category-div">
                  {categorySelected === i && (
                    <div
                      className="close"
                      onClick={() => setCategorySelected(-1)}
                    >
                      {<Close />}
                    </div>
                  )}

                  <div
                    onClick={() => setCategorySelected(i)}
                    className={classNames("category", {
                      "category-selected": i === categorySelected,
                    })}
                  >
                    {category}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="key advanced-search-btn d-flex align-items-center"
            data-bs-toggle="collapse"
            href="#advanced-search-div"
            type="button"
            aria-expanded="false"
            aria-controls="advanced-search-div"
          >
            Advanced Search <DownChevron />
          </button>
        </div>
        <div id="advanced-search-div" className="collapse">
          <strong>Filter by</strong>
          <br />
          <div className="d-flex justify-content-center">
            <div className="filter-keys d-flex container justify-content-between w-100">
              <div
                className="key"
                data-bs-toggle="collapse"
                href="#price-div"
                role="button"
                aria-expanded="false"
                aria-controls="price-div"
              >
                <span> Price</span>
              </div>
              <div
                className="key"
                data-bs-toggle="collapse"
                href="#most-bought-div"
                role="button"
                aria-expanded="false"
                aria-controls="most-bought-div"
              >
                <span>Most Bought</span>
              </div>
              <div
                className="key"
                data-bs-toggle="collapse"
                href="#partner-div"
                role="button"
                aria-expanded="false"
                aria-controls="partner-div"
              >
                <span>Partner</span>
              </div>
              <br />
            </div>
          </div>
          <div className="key-filter">
            <div id="price-div" className="filter-by-price collapse"></div>
            <div id="most-bought-div" className="filter-by-bought collapse">
              sss22
            </div>
            <div id="partner-div" className="filter-by-partner collapse">
              sss333
            </div>
          </div>
        </div>
        <div className="products">
          <ProductsCustomPagination data={productsList} />
        </div>
      </div>
    </>
  );
};

export default Product;
