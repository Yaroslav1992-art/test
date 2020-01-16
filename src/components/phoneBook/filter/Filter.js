import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import css from "./filter.module.css";

class Filter extends Component {
  static propTypes = {
    onInput: PropTypes.func.isRequired
  };

  render() {
    return (
      <>
        <div className={css.container}>
          <h3 className={css.title}>Find contacts by name</h3>
          <div className={css.wrapper}>
            <TextField
              id="1"
              label="Name"
              variant="outlined"
              color="primary"
              onInput={this.props.onInput}
              name="name"
              className={css.input}
              size="small"
              type="search"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
