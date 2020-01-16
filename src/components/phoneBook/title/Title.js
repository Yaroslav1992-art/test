import React from "react";
import css from "./title.module.css";

const Title = ({ title }) => <h1 className={css.title}>{title}</h1>;

export default Title;
