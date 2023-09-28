const Input = ({ id, label, type, placeholder, ...props }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={type}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </>
  );
};

export default Input;
