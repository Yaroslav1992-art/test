import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import css from "./contactList.module.css";
import ContactItem from "./contactItem/ContactItem";
import slideTransition from "../../transitions/slide.module.css";

console.log(slideTransition);

class ContactList extends Component {
  static propTypes = {
    deleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired
  };

  onHandleClickDelete = e => {
    const id = e.target.closest("li").id;
    this.props.deleteContact(id);
  };

  render() {
    const newArr = this.props.contacts.filter(e =>
      e.name.toLowerCase().includes(this.props.filter)
    );

    return (
      <TransitionGroup component="ul" className={css.containerUl}>
        {this.props.filter.length === 0
          ? this.props.contacts.map(e => (
              <CSSTransition
                key={e.id}
                timeout={250}
                classNames={slideTransition}
                unmountOnExit
              >
                <ContactItem
                  onHandleClickDelete={this.onHandleClickDelete}
                  object={e}
                />
              </CSSTransition>
            ))
          : newArr.map(e => (
              <ContactItem
                key={e.id}
                onHandleClickDelete={this.onHandleClickDelete}
                object={e}
              />
            ))}
        {/* </ul> */}
      </TransitionGroup>
    );
  }
}

export default ContactList;
