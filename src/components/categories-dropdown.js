import { useEffect, useState, useRef } from "react";
import { welcomeConroller } from "../controllers/welcome-page";
import RightChevron from "../icons/right-chevron";
import Toggle from "../icons/toggle";
import DownChevron from "../icons/down-chevron";
import classNames from "classnames";

const CategoriesDropDown = ({ ...props }) => {
  const [visible, isVisible] = useState(false);
  const [categorySelected, setCategorySelected] = useState(0);
  const [provisionSelected, setProvisionSelected] = useState(-1);
  const [provCategoriesList, setProvCategoriesList] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const [showHeaderText, setShowHeaderText] = useState(false);
  const ref = useRef();

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
      provision_id: provisionSelected,
    });
  };

  const modifyHeader = (name, id) => {
    props.onChange({
      category_id: categorySelected,
      provision_id: id,
    });
    setProvisionSelected(id);
    isVisible(false);
    setHeaderText(name);
    setShowHeaderText(true);
  };

  const modifyCategorySelected = (id, name, provision) => {
    props.onChange({
      category_id: id,
      provision_id: provisionSelected,
    });
    setCategorySelected(id);
    if (!provision) {
      isVisible(false);
      setHeaderText(name);
      setShowHeaderText(true);
    }
  };

  useEffect(() => {
    welcomeConroller
      .getProvisionByCategory(categorySelected)
      .then((response) => {
        setProvCategoriesList(response.data);
      });
  }, [categorySelected]);

  return (
    <div ref={ref} className="col-3">
      <div
        onClick={() => isVisible(!visible)}
        className="dropdown-header d-flex"
      >
        {!showHeaderText && <Toggle />}
        <span className="title">
          {" "}
          {showHeaderText ? headerText : "Categories"}
        </span>
        <div>
          <DownChevron />
        </div>
      </div>
      {visible && (
        <div  className="d-flex categories-dropdown rounded ">
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
                  className={classNames("dropdown-content ", {
                    selected: category.id === categorySelected,
                  })}
                >
                  <span> {category.name}</span>
                  {category.provisions && <RightChevron />}
                </li>
              );
            })}
          </ul>
          {categorySelected !== 0 && (
            <ul className="sub-categories col-7 hidden">
              {provCategoriesList.map((provcategory, index) => {
                return (
                  <li
                  key={"sub_categrory"+index}
                    onClick={() =>
                      modifyHeader(provcategory.name, provcategory.id)
                    }
                    key={"sub-category" + index}
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
