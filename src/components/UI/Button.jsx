export default function Button({ children, textOnly, className, ...props }) {
  let cssClasses = textOnly ? "text-button" : "button";
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
