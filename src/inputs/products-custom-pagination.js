import laptop1 from "../laptop1.jpeg";
import "../css/products-custom-pagination.css";
import LeftChevron from "../icons/left-chevron";
import RightChevron from "../icons/right-chevron";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Outlet, Link } from "react-router-dom";

const ProductsCustomPagination = ({ ...props }) => {
  const pageNumbers = Array.from(
    { length: props.data.length / 3 },
    (_, i) => i + 1
  );

  const [dataList, setDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const next = () => {
    if (pageNumber !== props.data.length / 3) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previous = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  useEffect(() => {
    let list = props.data.slice((pageNumber - 1) * 3, pageNumber * 3);
    setDataList(list);
  }, [pageNumber, props.data]);

  return (
    <div className="container-fluid">
      <div className="d-flex row">
        {dataList.map((product, i) => {
          return (
           <Link to={"/products/"+product.id} className="col-4 product-list-item">
              <div key={"product" + i}>
              <img src={laptop1} alt="" className="product-img" />
              <div className="overlay">
                <div className="d-flex flex-column align-items-center justify-content-center overlay-content">
                  <strong>
                    {product.name} by {product.company_name}
                  </strong>

                  <strong>{product.price}$</strong>
                </div>
              </div>
            </div>
           </Link>
          );
        })}
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <div
          onClick={() => previous()}
          className={classNames("col-1 d-flex align-items-center justify-content-center", {
            "disabled": pageNumber === 1
          })}
        >
          <LeftChevron />
        </div>
        {pageNumbers.map((i) => {
          return (
            <div
              onClick={() => setPageNumber(i)}
              className={classNames("pageNumber", {
                pageNumberSelected: i === pageNumber,
              })}
            >
              {i}
            </div>
          );
        })}
         <div
          onClick={() => next()}
          className={classNames("col-1 d-flex align-items-center justify-content-center", {
            "disabled": pageNumber === props.data.length / 3
          })}
        >
          <RightChevron />
        </div>
      </div>
    </div>
  );
};

export default ProductsCustomPagination;
