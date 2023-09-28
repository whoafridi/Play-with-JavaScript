const Button = ({children, className, ...props}) => {
  
  return <button className={ className ? className="" : ""} {...props}>{children}</button>;
};

export default Button;
