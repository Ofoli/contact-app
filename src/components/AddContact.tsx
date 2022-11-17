import { BaseSyntheticEvent, Component } from "react";
import { Navigate } from "react-router-dom";
import { Consumer } from "../context/context";
import TextInputGroup from "../layout/TextInputGroup";
import { addContactRequest } from "../requests/request";

interface AddContactProps extends ContactProp {
  errors: { name: string; email: string; phone: string } | null;
}

const INITIAL_STATE = {
  id: "",
  name: "",
  email: "",
  phone: "",
  errors: null,
};

class AddContact extends Component {
  state: AddContactProps = INITIAL_STATE;

  handleSubmit = async (dispatch: DispatchType) => {
    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === "") {
      return this.setState({ errors: { name: "Name is required" } });
    }

    if (email === "") {
      return this.setState({ errors: { email: "Email is required" } });
    }

    if (phone === "") {
      return this.setState({ errors: { phone: "Phone is required" } });
    }

    const res = await addContactRequest({
      name,
      email,
      phone,
    });

    console.log(res);
    if (res !== undefined) dispatch({ type: "ADD_CONTACT", payload: res });

    // Clear State
    this.setState(INITIAL_STATE);
  };

  handleChange = (event: ChangeEventType) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleSubmit(dispatch);
                  }}
                >
                  <TextInputGroup
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.handleChange}
                    error={errors?.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.handleChange}
                    error={errors?.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    type="name"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.handleChange}
                    error={errors?.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
