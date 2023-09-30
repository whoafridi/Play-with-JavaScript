const Card: React.FC<JSX.IntrinsicElements["div"]> = ({
  className,
  children,
  ...restProps
}) => (
  <div
    className={`card border-0 shadow-lg rounded-4 ${
      className ? className : ""
    }`}
    {...restProps}
  >
    <div className="card-body">{children}</div>
  </div>
);

export default Card;
