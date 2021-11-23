import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const Product = ({ ...props }) => {
  let { productId } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1);
  const [categorySelected, setCategorySelected] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    productsController.getProductsCategoryId().then((response) => {
      let id = response.data[0].id;
      productsController
        .getCategories(id)
        .then((res) => {
          console.log(res);

          setCategories(res.data);
        })
        .then(() => {
          productsController.getProducts().then((pr) => {
            setProductsList(pr.data);
            setLoading(false);
          });
        });
    });
  }, []);

  return (
    <div className="">
      <NavBar selectedTab="products" />

      <div className="container-fluid row d-flex justify-content-center">
        <div className="col-12 search-bar d-flex align-items-center">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search: Place Holder: Company name, Device name , category of this devices"
            className="product-search-input"
          />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>
        {!loading && (
          <>
            <SliderAnimation
              content={[
                {
                  image: soulmed,
                  title: categories[0].name,
                  desciption: "Description 1",
                  button: "Discover More",
                },
                {
                  image: laptop1,
                  title: categories[1].name,
                  desciption: "Description 2",
                  button: "Discover More",
                },
                {
                  image: laptop1,
                  title: categories[2].name,
                  desciption: "Description 3",
                  button: "Discover More",
                },
              ]}
            />

            <div className="products-categories w-100 col-12 mt-5 d-flex flex-wrap justify-content-center">
              {categories
                .filter((ctg) =>
                  searchText !== "" ? ctg.name.indexOf(searchText) >= 0 : true
                )
                .map((category) => {
                  return (
                    <div
                      onClick={() =>
                        navigate("/products/category/" + category.id)
                      }
                      className="category-card mx-2 mt-2 col-4"
                    >
                      <h4>{category.name}</h4>
                      <br />
                      <div className="d-flex flex-wrap">
                        {productsList
                          .filter((pr) => pr.profession_fk === category.id)
                          .slice(0, 2)
                          .map((product) => {
                            return (
                              <div className="d-flex  justify-content-center align-items-center col-6 flex-column">
                                <img
                                  src={laptop1}
                                  alt=""
                                  className="product-image"
                                />
                                <span>{product.name}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
      <br />
    </div>
  );
};

export default Product;
