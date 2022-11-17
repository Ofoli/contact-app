import { Component } from "react";
import { Consumer } from "../context/context";
import ContactForm from "./ContactForm";

export default function withContactForm(action: string) {
  class TheContactForm extends Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            const { dispatch } = value;
            return (
              <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                  <ContactForm action={action} dispatch={dispatch} />
                </div>
              </div>
            );
          }}
        </Consumer>
      );
    }
  }
  return TheContactForm;
}
