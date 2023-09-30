import { useState } from "react";

type Prop = JSX.IntrinsicElements["input"] & {
  id: string;
  label?: string;
};

const Input: React.FC<Prop> = ({
  children: _,
  name: __,
  label,
  className,
  ...restProps
}) => {
  const [revealPassword, setRevealPassword] = useState(false);

  const toggleRevealPassword = () =>
    setRevealPassword((revealPassword) => !revealPassword);

  return (
    <>
      <div className="mb-3 position-relative">
        <label htmlFor={restProps.id} className="text-dark opacity-75">{label}</label>
        <input
          {...restProps}
          name={restProps.id}
          type={
            restProps.type === "password" && !revealPassword
              ? "password"
              : restProps.type === "password" && revealPassword
              ? "text"
              : restProps.type
          }
          className={`form-control " ${className} ? ${className} : ""`}
        />
        {restProps.type === "password" && (
          <span className="btn position-absolute top-50 end-0 me-3 p-0">
            {!revealPassword ? (
              <i
                className="fa-regular fa-eye-slash"
                onClick={toggleRevealPassword}
              />
            ) : (
              <i className="fa-regular fa-eye" onClick={toggleRevealPassword} />
            )}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
