import React from "react";

const PageHead = ({ heading, title, text }) => {
  return (
    <div className="container pagehead ">
      <h6>{heading}</h6>
      <h1 style={{ color: "black" }}>{title}</h1>
      <p>{text}</p>
    </div>
  );
};

export default PageHead;
