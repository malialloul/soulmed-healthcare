import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DoctorsAdvancedSearch from "../components/doctors-advanced-search";
import NavBar from "../components/nav-bar";
import SearchModel from "../components/search-model";
import { welcomeConroller } from "../controllers/welcome-page";
import CustomPagination from "../inputs/custom-pagination";
import "../css/advanced-search.css";
import PriceRange from "../inputs/price-range";

const AdvancedSearch = () => {
  const { categoryId, professionId, searchText } = useParams();
  const [data, setData] = useState([]);
  const [tempdata, setTempData] = useState([]);

  const [cityText, setCityText] = useState("");
  const [priceValue, setPriceValue] = useState([]);

  useEffect(() => {
    setTempData(data);
  }, [data])

  useEffect(() => {
    let list = data;
    if(cityText !== ""){
    list = list.filter((item) => item.location.includes(cityText));
    setTempData(list);
    }
    else{
      setTempData(data)
    }
  }, [cityText]);


  return (
    <div>
      <NavBar />
      <SearchModel
        category_id={categoryId}
        profession_id={professionId}
        searchText={searchText}
        getData={(data) => setData(data)}
      />
      <br />
      <div className="d-flex justify-content-center">
        <div className="filters d-flex flex-column justify-content-center align-items-center col-md-8">
          <h2>Filters</h2>
          <div className="d-flex w-100 filter-keys justify-content-between">
            <span className="key">Nearest by Km</span>
            <span
              className="key"
              data-bs-toggle="collapse"
              href="#city-div"
              role="button"
              aria-expanded="false"
              aria-controls="city-div"
            >
              City
            </span>
            <span className="key">Country</span>
            <span
              className="key"
              data-bs-toggle="collapse"
              href="#price-div"
              role="button"
              aria-expanded="false"
              aria-controls="price-div"
            >
              Price
            </span>
            <span className="key">Availability</span>
          </div>
          <div id="price-div" className="filter-by-price collapse">
            <PriceRange min={0} max={200} />
          </div>
          <div id="city-div" className="filter-by-city collapse">
            <input
              type="text"
              className="input"
              placeholder="Search by City"
              onChange={(e) => setCityText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />

      {categoryId === "1" && <DoctorsAdvancedSearch data={tempdata} />}
    </div>
  );
};

export default AdvancedSearch;
