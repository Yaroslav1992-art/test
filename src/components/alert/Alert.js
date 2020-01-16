import React from "react";
import css from "./alert.module.css";

const Alert = ({ title }) => (
  <div className={css.wrapper}>
    <p>{title}</p>
  </div>
);

export default Alert;
