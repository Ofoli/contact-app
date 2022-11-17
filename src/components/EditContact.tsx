import { useState, useEffect, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Consumer } from "../context/context";
import TextInputGroup from "../layout/TextInputGroup";
import { fetchContactRequest, updateContactRequest } from "../requests/request";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}
interface EditContactState extends ContactProp {
  errors: Errors | null;
}
const NAME_ERROR = { name: "Name is required" };
const EMAIL_ERROR = { email: "Email is required" };
const PHONE_ERROR = { phone: "Phone is required" };
const INITIAL_STATE = {
  id: "",
  name: "",
  email: "",
  phone: "",
  errors: null,
};

export default function EditContact() {
  const params = useParams();
  const [state, setState] = useState<EditContactState>(INITIAL_STATE);

  useEffect(() => {
    const fetchContact = async () => {
      const id = "1";
      const contact = await fetchContactRequest(id);

      if (contact !== undefined) {
        setState({
          id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          errors: null,
        });
      }
    };

    fetchContact();
    return;
  }, []);

  const onSubmit = async (
    e: React.BaseSyntheticEvent,
    dispatch: DispatchType
  ) => {
    e.preventDefault();

    const { id, name, email, phone } = state;
    // Check For Errors
    if (name === "") return setErrorNewState(setState, NAME_ERROR);
    if (email === "") return setErrorNewState(setState, EMAIL_ERROR);
    if (phone === "") return setErrorNewState(setState, PHONE_ERROR);

    const updContact = {
      name,
      email,
      phone,
    };

    const res = await updateContactRequest(id, updContact);
    if (res) dispatch({ type: "UPDATE_CONTACT", payload: res });

    // Clear State
    setState(INITIAL_STATE);

    // this.props.history.push("/");
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const { name, email, phone, errors } = state;

  return (
    <Consumer>
      {(value) => {
        const { dispatch } = value;
        return (
          <div className="card mb-3">
            <div className="card-header">Edit Contact</div>
            <div className="card-body">
              <form onSubmit={async (e) => await onSubmit(e, dispatch)}>
                <TextInputGroup
                  type="text"
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleChange}
                  error={errors?.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleChange}
                  error={errors?.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  type="number"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={handleChange}
                  error={errors?.phone}
                />
                <input
                  type="submit"
                  value="Update Contact"
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

const setErrorNewState = (
  setState: React.Dispatch<React.SetStateAction<EditContactState>>,
  data: Errors
) =>
  setState((prevState) => ({
    ...prevState,
    errors: { ...prevState.errors, ...data },
  }));
