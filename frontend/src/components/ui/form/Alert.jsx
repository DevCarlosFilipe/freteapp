const alertIcons = {
    danger: "bi-exclamation-triangle-fill",
    success: "bi-check-circle-fill",
    warning: "bi-exclamation-circle-fill",
    info: "bi-info-circle-fill"
};

function Alert({
    children,
    variant = "info",
    title,
    className = "",
    ...props
}) {
    const icon = alertIcons[variant] || alertIcons.info;

    return (
        <div
            className={`alert alert-${variant} d-flex align-items-start gap-2 ${className}`.trim()}
            role="alert"
            {...props}
        >
            <i className={`bi ${icon} mt-1`} aria-hidden="true"></i>

            <div>
                {title && <strong className="d-block">{title}</strong>}
                <span>{children}</span>
            </div>
        </div>
    );
}

export default Alert;
