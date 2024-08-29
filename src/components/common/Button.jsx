function Button({
  children,
  type = "button",
  textColor = "text-white",
  color = "red",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${className} ${color} text-background rounded-md px-4 py-3 md:py-4 md:px-8 text-xs md:text-sm hover:scale-[1.02] transition-transform active:scale-95`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
