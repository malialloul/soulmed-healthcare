import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsController } from "../../controllers/product-page";
import "../../css/products-main.css";
import DownChevron from "../../icons/down-chevron";
import Close from "../../icons/close";
import SearchIcon from "../../icons/search-icon";
import laptop1 from "../../laptop1.jpeg";
import { Outlet, Link } from "react-router-dom";
import soulmed from "../../logo.png";
import {
  ReactiveBase,
  RangeSlider,
  SelectedFilters,
  ResultList,
  ReactiveList,
} from "@appbaseio/reactivesearch";
import classNames from "classnames";
import CustomPagination from "../../inputs/custom-pagination";
import NavBar from "../../components/nav-bar";
import PriceRange from "../../inputs/price-range";
import SliderAnimation from "../../inputs/slider";

const CategoryProducts = ({ ...props }) => {
  const { categoryId } = useParams();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    productsController
      .getCategory(categoryId)
      .then((response) => {
        setCategory(response.data[0]);
      })
      .then(() => {
        productsController.getCategoryProduct().then((res) => {
          setProductsList(res.data);
          setLoading(false);
        });
      });
  }, []);

  return (
    <div className="">
      <NavBar selectedTab="products" />

      {!loading && (
        <>
          <div className="container-fluid row d-flex justify-content-center">
            <div className="col-12 search-bar d-flex align-items-center">
              <input
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
                defaultValue={category.name}
                placeholder="Search: Place Holder: Company name, Device name , category of this devices"
                className="product-search-input"
              />
              <div className="search-icon">
                <SearchIcon />
              </div>
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default CategoryProducts;
