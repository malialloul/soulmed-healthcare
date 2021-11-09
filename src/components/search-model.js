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
import SearchInput from "../inputs/search-input";
import CategoriesDropDown from "./categories-dropdown";
import "../css/search-model.css";
import { useNavigate } from "react-router-dom";
import { util } from "../public/util";

const SearchModel = ({ ...props }) => {
  const [searchFilterTextValue, setSearchFilterTextValue] = useState(
    props.searchText ? props.searchText : ""
  );
  const [locationFilterTextValue, setLocationFilterTextValue] = useState("");
  const [visibleSearchDropDown, setSearchVisibleDropDown] = useState(false);
  const [visibleLocationDropDown, setLocationVisibleDropDown] = useState(false);
  const [showAroundMe, setShowAroundMe] = useState(false);
  const [myLocationText, setMyLocationText] = useState("Around Me");
  const [searchValue, setSearchValue] = useState("");

  const [choiceSelected, setChoiceSelected] = useState({
    category_id: props.category_id ? props.category_id : 0,
    profession_id: props.profession_id ? props.profession_id : -1,
  });

  const [info, setInfo] = useState([]);

  useEffect(() => {
    welcomeConroller
      .getProfessionByCategory(choiceSelected.category_id)
      .then((response) => {
        let ids = "";
        response.data.map((pr, i) => {
          ids += "profession_fk=" + pr.id + "&";
        });
        welcomeConroller.getInfoByQuery(ids).then((res) => {
          let list = res.data;

          if (!props.category_id && choiceSelected.profession_id !== -1) {
            list = list.filter(
              (item) => item.profession_fk === choiceSelected.profession_id
            );
          }

          setInfo(list);
        });
      });
  }, [choiceSelected.category_id, choiceSelected.profession_id]);
  const navigate = useNavigate();

  const navigateToAdvancedSearch = (e) => {
    let count = 0;
    let itemViewed = null;
    for (let i = 0; i < info.length; i++) {
      if (util.showItem(info[i], searchFilterTextValue)) {
        count++;
        itemViewed = info[i];
      }
    }

    if (
      e.key === "Enter" &&
      searchFilterTextValue !== "" &&
      !props.category_id
    ) {
      if (count === 1) {
        navigate("view-profile/" + itemViewed.id, { replace: true });
      } else {
        navigate(
          "advanced-search/" +
            choiceSelected.category_id +
            "/" +
            choiceSelected.profession_id +
            "/" +
            searchFilterTextValue,
          { replace: false }
        );
      }
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center search-div">
      <CategoriesDropDown
        data={props.categories ? props.categories : []}
        choiceSelected={props.categories ? null : choiceSelected}
        onChange={(choice) => setChoiceSelected(choice)}
      />

      <SearchInput
        data={info}
        searchText={searchFilterTextValue}
        onGetResults={props.getData ? (data) => props.getData(data) : undefined}
      >
        <div className="dropdown-header">
          <input
            type="text"
            placeholder="Search: Place Holder: Enter Dr name, Profession, Enter Institute name"
            className="search-input"
            value={searchFilterTextValue}
            onClick={() => setSearchVisibleDropDown(true)}
            onKeyDown={(e) => navigateToAdvancedSearch(e)}
            onChange={(e) => setSearchFilterTextValue(e.target.value)}
          />

          <div className="icon">
            <SearchIcon />
          </div>
        </div>
      </SearchInput>

      <SearchInput data={[]}>
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
      </SearchInput>
    </div>
  );
};

export default SearchModel;
