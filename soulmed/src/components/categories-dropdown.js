import { useEffect, useState, useRef } from "react";
import { welcomeConroller } from "../controllers/welcome-page";
import RightChevron from "../icons/right-chevron";
import Toggle from "../icons/toggle";
import DownChevron from "../icons/down-chevron";
import classNames from "classnames";

const CategoriesDropDown = ({ ...props }) => {
  const [visible, isVisible] = useState(false);
  const [categorySelected, setCategorySelected] = useState(
    props.choiceSelected !== null ? props.choiceSelected.category_id : 0
  );
  const [professionselected, setProfessionSelected] = useState(-1);
  const [provCategoriesList, setProvCategoriesList] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const [showHeaderText, setShowHeaderText] = useState(
    props.choiceSelected === null ? false : true
  );
  const ref = useRef();
  useEffect(() => {
    if (props.choiceSelected !== null) {
      let header = "";
      if (parseInt(props.choiceSelected.category_id) === 0) {
        header = "All Categories";
        setHeaderText(header);
        setShowHeaderText(true);
      } else {
        welcomeConroller
          .getCategory(props.choiceSelected.category_id)
          .then((response) => {
            welcomeConroller
              .getProfession(props.choiceSelected.profession_id)
              .then((response2) => {
                header = response.data[0].name + (parseInt(props.choiceSelected.profession_id) >=0 ?  "/" + response2.data[0].name : "");
                setHeaderText(header);
                setShowHeaderText(true);
              });
          });
      }
    }
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (visible && ref.current && !ref.current.contains(e.target)) {
        isVisible(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visible]);

  const selectAll = () => {
    setShowHeaderText("");
    isVisible(false);
    setCategorySelected(0);
    props.onChange({
      category_id: 0,
      profession_id: -1,
    });
  };

  const modifyHeader = (name, id) => {
    props.onChange({
      category_id: categorySelected,
      profession_id: id,
    });
    setProfessionSelected(id);
    isVisible(false);
    setHeaderText(name);
    setShowHeaderText(true);
  };

  const modifyCategorySelected = (id, name, provision) => {
    props.onChange({
      category_id: id,
      profession_id: -1,
    });
    setCategorySelected(id);
    setProfessionSelected(-1);
    if (!provision) {
      isVisible(false);
      setHeaderText(name);
      setShowHeaderText(true);
    }
  };

  useEffect(() => {
    welcomeConroller
      .getProfessionByCategory(categorySelected)
      .then((response) => {
        setProvCategoriesList(response.data);
      });
  }, [categorySelected]);
  

  return (
    <div ref={ref} className="col-4">
      <div
        onClick={() => props.data.length !== 0 && isVisible(!visible)}
        className="dropdown-header d-flex justify-content-between"
      >
        {!showHeaderText && <Toggle />}
        <span className="title">
          {" "}
          {showHeaderText ? headerText : "Categories"}
        </span>
        <div>{props.data.length !== 0 && <DownChevron />}</div>
      </div>
      {visible && props.choiceSelected === null && (
        <div className="d-flex categories-dropdown rounded ">
          <ul className="col-5 categories">
            <li onClick={() => selectAll()} className="dropdown-content">
              <span>All Categories</span>
            </li>
            {props.data.map((category, index) => {
              return (
                <li
                  key={"category" + index}
                  onClick={() =>
                    modifyCategorySelected(
                      category.id,
                      category.name,
                      category.provisions
                    )
                  }
                  className={classNames("dropdown-content d-flex justify-content-between ", {
                    selected: category.id === categorySelected,
                  })}
                >
                  <span> {category.name}</span>
                  <span> {category.provisions && <RightChevron />}</span>
                </li>
              );
            })}
          </ul>
          {categorySelected !== 0 && (
            <ul className="sub-categories col-7 hidden">
              {provCategoriesList.map((provcategory, index) => {
                return (
                  <li
                    key={"sub_categrory" + index}
                    onClick={() =>
                      modifyHeader(provcategory.name, provcategory.id)
                    }
                    className="dropdown-content"
                  >
                    <span> {provcategory.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesDropDown;
