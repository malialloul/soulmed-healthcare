import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/nav-bar";
import { productsController } from "../../controllers/product-page";
import "../../css/product.css";
import laptop1 from "../../laptop1.jpeg";
import laptop2 from "../../laptop2.jpeg";
import laptop3 from "../../laptop3.jpeg";

const Product = () => {
  let { productId } = useParams();
  let imagePath = [laptop1, laptop2, laptop3];
  const [index, setIndex] = useState(0);
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    productsController.getProduct(productId).then((response) => {
      setProductDetails(response.data[0]);
    });
  }, []);
  return (
    <div className="">
      <NavBar selectedTab="products" />

      <div className="header d-flex justify-content-between">
        <div className="col-4">
          <strong>
            {productDetails.name} by {productDetails.company_name}
          </strong>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button className="buy-now">
            Buy Now for {productDetails.price}
          </button>
        </div>
      </div>
      <div className="body">
        <div className="d-flex">
          <div className="col-4 d-flex h-auto flex-column justify-content-center">
            {imagePath.map((img, i) => {
              return (
                <div
                  key={"product" + i}
                  className="d-flex h-auto justify-content-center"
                >
                  <img
                    src={img}
                    alt=""
                    className="product-ex-image"
                    onClick={() => setIndex(i)}
                  />
                </div>
              );
            })}
          </div>
          <div className="col-6 d-flex align-items-center">
            <img src={imagePath[index]} className="product-img" alt="" />
          </div>
        </div>
        <div className="about">
          <strong>Abou this Item</strong>
          <span> this item is kaza kaza</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
