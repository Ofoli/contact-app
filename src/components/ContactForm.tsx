import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextInputGroup from "../layout/TextInputGroup";
import {
  fetchContactRequest,
  updateContactRequest,
  addContactRequest,
} from "../requests/request";

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}
interface ContactState extends ContactProp {
  errors: Errors | null;
}

interface ContactFormProps {
  action: string;
  dispatch: DispatchType;
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

export default function ContactForm(props: ContactFormProps) {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<ContactState>(INITIAL_STATE);

  const { action, dispatch } = props;
  const { name, email, phone, errors } = state;

  useEffect(() => {
    const fetchContact = async () => {
      if (action === "edit") {
        const id = params.id ?? "";
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
      }
    };

    fetchContact();
    return;
  }, []);

  const onSubmit = async (event: GenericEventType, dispatch: DispatchType) => {
    event.preventDefault();

    const { name, email, phone } = state;
    // Check For Errors
    if (name === "") return setErrorNewState(setState, NAME_ERROR);
    if (email === "") return setErrorNewState(setState, EMAIL_ERROR);
    if (phone === "") return setErrorNewState(setState, PHONE_ERROR);

    const contact = {
      name,
      email,
      phone,
    };

    let request = addContactRequest(contact);
    let type = "ADD_CONTACT";

    if (action === "edit") {
      request = updateContactRequest(state.id, contact);
      type = "UPDATE_CONTACT";
    }
    const res = await request;
    if (res !== undefined) dispatch({ type, payload: res });

    // Clear State
    setState(INITIAL_STATE);
    navigate("/", { replace: true });
  };

  const handleChange = (event: GenericEventType) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
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
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={handleChange}
          error={errors?.phone}
        />
        <input
          type="submit"
          value={action === "edit" ? "Update Contact" : "Add Contact"}
          className="btn btn-light btn-block"
        />
      </form>
    </>
  );
}

const setErrorNewState = (
  setState: React.Dispatch<React.SetStateAction<ContactState>>,
  data: Errors
) =>
  setState((prevState) => ({
    ...prevState,
    errors: { ...prevState.errors, ...data },
  }));
