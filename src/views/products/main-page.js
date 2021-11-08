import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsController } from "../../controllers/product-page";
import "../../css/products-main.css";
import DownChevron from "../../icons/down-chevron";
import Close from "../../icons/close";
import SearchIcon from "../../icons/search-icon";

import {
  ReactiveBase,
  RangeSlider,
  SelectedFilters,
  ResultList,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import classNames from "classnames";
import ProductsCustomPagination from "../../inputs/products-custom-pagination";
import NavBar from "../../components/nav-bar";
import PriceRange from "../../inputs/price-range";

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
        if (pr.price > max) {
          max = pr.price;
        }
      });
      setMaxPrice(max);
    });
  }, []);

  return (
    <div className="">
      <NavBar selectedTab="products" />

      <div className="row d-flex justify-content-center">
        <div className="col-7 search-bar d-flex align-items-center">
          <input
            type="text"
            placeholder="Search: Place Holder: Company name, Device name , category of this devices"
            className="product-search-input"
          />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>
      </div>
      <br />
      <div className="category-filter ">
        <strong>Choose one of these categories</strong>
        <br />
        <div className="d-flex justify-content-between">
          <div className="categories-div d-flex align-items-center">
            {categories.map((category, i) => {
              return (
                <div
                  key={"category" + i}
                  className="d-flex align-items-center justify-content-start category-div"
                >
                  {categorySelected === i && (
                    <div
                      className="close"
                      onClick={() => setCategorySelected(-1)}
                    >
                      X
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
            className="advanced-search-btn d-flex align-items-center"
            data-bs-toggle="collapse"
            href="#advanced-search-div"
            type="button"
            aria-expanded="false"
            aria-controls="advanced-search-div"
          >
            <span>Advanced Filter</span>
            <DownChevron />
          </button>
        </div>
      </div>
      <div id="advanced-search-div" className="collapse">
        <strong>Filter by</strong>
        <br />
        <div className="filter-keys d-flex justify-content-center w-100">
          <div className="d-flex justify-content-between w-50">
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
              href="#partner-div"
              role="button"
              aria-expanded="false"
              aria-controls="partner-div"
            >
              <span>Partner</span>
            </div>

            <div
              className="key"
              data-bs-toggle="collapse"
              href="#additional-filters-div"
              role="button"
              aria-expanded="false"
              aria-controls="additional-filters-div"
            >
              <span>Additional Filters</span>
            </div>
          </div>
          <br />
        </div>
        <div className="key-filter">
          <div id="price-div" className="filter-by-price collapse">
            <PriceRange min={0} max={maxPrice} />
          </div>
          <div id="partner-div" className="filter-by-partner collapse">
            sss22
          </div>
          <div
            id="additional-filters-div"
            className="additional-filters-div collapse"
          >
            sss333
          </div>
        </div>
      </div>
      <div className="products">
        <ProductsCustomPagination data={productsList} />
      </div>
    </div>
  );
};

export default Product;
