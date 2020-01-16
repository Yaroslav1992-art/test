import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList";
import services from "../../services/services";
import Title from "./title/Title";
import Alert from "../alert/Alert";
import popTransition from "../transitions/pop.module.css";
import slideTransition from "../transitions/slide.module.css";
import css from "./phoneBook.module.css";

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: "",
    isFilterNead: false,
    isLogo: false,
    alertName: null,
    alertFlag: false
  };

  pushContacts = (x, y, e) => {
    e.persist();
    console.log(e.target.elements[1]);
    if (e.target.name.value === "") {
      this.alert("enter name");
      return;
    }
    const flag = this.state.contacts.find(
      ev => e.target.name.value === ev.name
    );
    flag
      ? this.alert(`${e.target.name.value} is already in contacts!!!`)
      : services
          .addItem({
            name: x,
            number: y
          })
          .finally(() => {
            this.fetchPost();
          });
  };

  alert = name => {
    this.setState({ alertName: name, alertFlag: true });
    setTimeout(() => {
      this.setState({ alertName: "", alertFlag: false });
    }, 3000);
  };

  handleInputSearch = e => {
    e.persist();
    this.setState(s => {
      return {
        filter: e.target.value.toLowerCase()
      };
    });
  };

  deleteContact = id => {
    services.deleteItem(id).finally(() => {
      this.fetchPost();
      console.log(this.state.contacts);
    });
  };

  fetchPost = async () => {
    try {
      const response = await services.getAllItems();
      if (response.data === null) {
        this.setState({
          contacts: []
        });
      } else {
        const post = Object.keys(response.data)
          .map(post => ({
            ...response.data[post],
            id: post
          }))
          .reverse();

        this.setState({
          contacts: post
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount = async () => {
    await this.fetchPost();
    if (this.state.contacts.length > 1) {
      this.setState({ isFilterNead: true, isLogo: true });
    } else {
      this.setState({ isFilterNead: false, isLogo: true });
    }
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState.contacts !== this.state.contacts)
      if (this.state.contacts.length > 1) {
        this.setState({ isFilterNead: true });
      } else {
        this.setState({ isFilterNead: false });
      }
  }

  render() {
    const {
      contacts,
      filter,
      isFilterNead,
      isLogo,
      alertName,
      alertFlag
    } = this.state;
    return (
      <>
        <CSSTransition
          in={alertFlag}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <Alert title={`${alertName} `} />
        </CSSTransition>
        <CSSTransition
          in={isLogo}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <Title title="Phonebook" />
        </CSSTransition>
        <div className={css.container}>
          <ContactForm isLogo={isLogo} pushContacts={this.pushContacts} />
          <CSSTransition
            in={isFilterNead}
            timeout={250}
            classNames={popTransition}
            unmountOnExit
          >
            <Filter onInput={this.handleInputSearch} />
          </CSSTransition>
          <ContactList
            deleteContact={this.deleteContact}
            contacts={contacts}
            filter={filter}
          />
        </div>
      </>
    );
  }
}

export default PhoneBook;
