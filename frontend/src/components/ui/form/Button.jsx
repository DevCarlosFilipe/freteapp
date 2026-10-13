function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    ...props
}) {
    const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";

    return (
        <button
            type={type}
            className={`btn btn-${variant} ${sizeClass} ${className}`.trim()}
            style={{ borderRadius: 0, ...props.style }}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
