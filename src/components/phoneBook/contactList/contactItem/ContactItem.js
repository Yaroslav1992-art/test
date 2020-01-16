import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import css from "../contactList.module.css";

const ContactItem = ({ object, onHandleClickDelete }) => (
  <li className={css.container} id={object.id}>
    <p className={css.itemElement}> {object.name}</p>
    <p className={css.itemElement}>{object.number}</p>
    <div>
      <IconButton onClick={onHandleClickDelete} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  </li>
);

export default ContactItem;
