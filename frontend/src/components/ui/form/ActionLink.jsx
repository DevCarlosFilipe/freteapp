function ActionLink({
    children,
    onClick,
    variant = "link",
    className = "",
    ...props
}) {
    return (
        <button
            type="button"
            className={`btn btn-${variant} p-0 text-decoration-none ${className}`.trim()}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}

export default ActionLink;
