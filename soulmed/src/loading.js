import  loadingSvg  from "./loading.svg";

const Loading = () => {
  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
      <img src={loadingSvg} alt="" />
    </div>
  );
};

export default Loading;
