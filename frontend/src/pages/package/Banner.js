import React from "react";

import "./styles.css";

export default function BannerComponent({heading, banner}) {
  return (
    <div className="">
      <img src={banner} alt="" style={{ width: "100%", height:'500px'}}/>
      <div className="centered_text text-light">{heading}</div>
    </div>
  );
}
