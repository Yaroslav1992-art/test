import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import css from "./contactForm.module.css";

class ContactForm extends Component {
  state = { name: "", number: "" };

  static propTypes = {
    pushContacts: PropTypes.func.isRequired
  };

  handleGetValue = e => {
    const info = e.target.value;
    const name = e.target.name;
    this.setState(s => {
      return {
        [name]: info
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.pushContacts(this.state.name, this.state.number, e);
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form className={css.container} onSubmit={this.handleSubmit}>
          <div className={css.wrapper}>
            <TextField
              id="1"
              label="Name"
              variant="outlined"
              color="primary"
              onChange={this.handleGetValue}
              name="name"
              value={name}
              className={css.input}
            />
          </div>
          <div className={css.wrapper}>
            <TextField
              id="2"
              label="Number"
              variant="outlined"
              color="primary"
              onChange={this.handleGetValue}
              name="number"
              value={number}
              className={css.input}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className={css.button}
            type="submit"
          >
            Add contact
          </Button>
        </form>
      </>
    );
  }
}

export default ContactForm;
