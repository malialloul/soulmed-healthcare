import { useEffect, useState, useRef } from "react";
import logo from "../logo.png";
import RightChevron from "../icons/right-chevron";
import Toggle from "../icons/toggle";
import DownChevron from "../icons/down-chevron";
import SearchIcon from "../icons/search-icon";
import LocationIcon from "../icons/location-icon";
import AroundMe from "../icons/around-me";
import Close from "../icons/close";
import { welcomeConroller } from "../controllers/welcome-page";
import DropDown from "../inputs/dropdown";
import CategoriesDropDown from "./categories-dropdown";
import "../css/search-model.css";

const SearchModal = ({ ...props }) => {
  const [searchList, setSearchList] = useState(props.doctorsData);
  const [doctorLocationList, setDoctorsLocationList] = useState(props.data);
  const [searchFilterTextValue, setSearchFilterTextValue] = useState("");
  const [locationFilterTextValue, setLocationFilterTextValue] = useState("");
  const [visibleSearchDropDown, setSearchVisibleDropDown] = useState(false);
  const [visibleLocationDropDown, setLocationVisibleDropDown] = useState(false);
  const [showAroundMe, setShowAroundMe] = useState(false);
  const [myLocationText, setMyLocationText] = useState("Around Me");
  const [searchClass, setSearchClass] = useState("apmt");
  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState(props.categories);

  const searchRef = useRef();
  const locationRef = useRef();

  const [choiceSelected, setChoiceSelected] = useState({
    category_id: 0,
    provision_id: -1,
  });

  const [info, setInfo] = useState([]);

  useEffect(() => {
    welcomeConroller
      .getProvisionByCategory(choiceSelected.category_id)
      .then((response) => {
        let ids = "";
        response.data.map((pr, i) => {
          ids += "provision_fk=" + pr.id + "&";
        });
        welcomeConroller.getInfoByQuery(ids).then((res) => {
          setInfo(res.data);
        });
      });
  }, [choiceSelected.category_id]);

  useEffect(() => {
    welcomeConroller
      .getProvision(choiceSelected.provision_id)
      .then((response) => {

        let query = "";
        if (response.data.length === 1) {
          query = "provision_fk=" + response.data[0].id;
        } else {
          response.data.map((pr, i) => {
            query += "provision_fk=" + pr.id + "&";
          });
        }
        welcomeConroller.getInfoByQuery(query).then((res) => {
          setInfo(res.data);

        });
      });
  }, [choiceSelected.provision_id]);
  
  return (
    <div className="d-flex align-items-center justify-content-center search-div">
      <CategoriesDropDown
        data={props.categories}
        onChange={(choice) => setChoiceSelected(choice)}
      />

      <DropDown data={info} searchText={searchFilterTextValue}>
        <div className="dropdown-header">
          <input
            type="text"
            placeholder={
              searchValue === ""
                ? "Doctor, establishment, speciality ..."
                : searchValue
            }
            className="search-input"
            value={searchFilterTextValue}
            onClick={() => setSearchVisibleDropDown(true)}
            onChange={(e) => setSearchFilterTextValue(e.target.value)}
          />

          <div className="icon">
            <SearchIcon />
          </div>
        </div>
      </DropDown>

      <DropDown data={[]}>
        <div className="dropdown-header">
          <input
            type="text"
            className="search-input"
            placeholder="Where ?"
            onClick={() => setLocationVisibleDropDown(true)}
            onChange={(e) => setLocationFilterTextValue(e.target.value)}
          />
          <div className="icon">
            <LocationIcon />
          </div>
          <div onClick={() => setShowAroundMe(true)} className="around-me-icon">
            <AroundMe />
          </div>
          {showAroundMe && (
            <div className="around-me-div d-flex justify-content-between">
              <div>
                <AroundMe />
              </div>

              <span>{myLocationText}</span>
              <div
                onClick={() => setShowAroundMe(false)}
                className="close-icon"
              >
                <Close />
              </div>
            </div>
          )}
        </div>
      </DropDown>
    </div>
  );
};

export default SearchModal;
