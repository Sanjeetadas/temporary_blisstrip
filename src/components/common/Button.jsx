export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`pill-button ${className}`} {...props}>
      {children}
    </button>
  );
}
