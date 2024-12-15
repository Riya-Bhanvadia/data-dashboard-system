import React from "react";
import Lottie from "lottie-react";
import * as loadingData from "../../utils/mainLoading.json";
import * as done from "../../utils/done.json";
import "./loading.css"

const Loading = (props) => {
  const { loading } = props;
  return (
    <div >
      {loading ? (
        <div className="loading-tag">
          <Lottie animationData={loadingData} style={{ width: "300px" }} />
          {"WelCome"}
        </div>
      ) : (
        <div className="loading-tag">
          <Lottie animationData={done} style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default Loading;
