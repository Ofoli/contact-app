import classnames from "classnames";

interface TextInputGroupProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type: string;
  onChange: ChangeEventProp;
  error: string | undefined;
}

const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error,
}: TextInputGroupProps) => {
  return (
    <div className="form-group" data-test="TextInputGroupComp">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error !== null && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextInputGroup;
