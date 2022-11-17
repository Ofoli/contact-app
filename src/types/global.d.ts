export {};

declare global {
  interface ContactProp {
    id: string;
    name: string;
    phone: string;
    email: string;
  }
  interface Action {
    type: string;
    payload: any;
  }
  type DispatchType = (action: Action) => void;
  type ChangeEventProp = (event: React.ChangeEvent<HTMLInputElement>) => void;
  type ChangeEventType = React.FormEvent<HTMLInputElement>;
}
