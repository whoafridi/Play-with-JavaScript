type Prop = JSX.IntrinsicElements["button"] & {
  outline?: boolean;
  danger?: boolean;
};

const Button: React.FC<Prop> = ({
  children,
  className,
  outline = false,
  danger = false,
  ...restprops
}) => (
  <button
    {...restprops}
    className={`btn rounded-pill shadow-lg ${
      outline ? "btn-outline-primary" : danger ? "btn-danger" : "btn-primary"
    } ${className ? className : ""}`}
  >
    {children}
  </button>
);

export default Button;
