const Button = (props: ButtonProps) => (
  <button onClick={props.onClick}>{props.text}</button>
);

export default Button;
