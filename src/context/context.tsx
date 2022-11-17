import { Component, createContext } from "react";
import { fetchAllContactsRequest } from "../requests/request";

interface ContextState {
  contacts: ContactProp[];
  dispatch: DispatchType;
}

interface contextProp {
  value?: ContextState;
  children: JSX.Element;
}

const Context = createContext<ContextState>({
  contacts: [],
  dispatch: () => null,
});

const reducer = (state: ContextState, action: Action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        ),
      };
    default:
      return state;
  }
};

export class Provider extends Component<contextProp, ContextState> {
  state: ContextState = {
    contacts: [],
    dispatch: (action: Action) =>
      this.setState((state) => reducer(state, action)),
  };

  async componentDidMount() {
    const res = await fetchAllContactsRequest();
    if (res !== undefined) this.setState({ contacts: res });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
