import React from "react";
import './loader.scss'

function Loader() {
  return (
    <>
      <div className="loader">
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <img src="./assets/icons/logo-1.gif" alt="" style={{width:"250px"}} />
          <h2>Loading...</h2>
        </div>
      </div>
    </>
  );
}

export default Loader;
