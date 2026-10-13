function CheckBox({
    id,
    label,
    checked,
    onChange,
    className = "",
    labelClassName = "",
    ...props
}) {
    return (
        <div className={`form-check ${className}`.trim()}>
            <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                {...props}
            />
            {label && (
                <label
                    className={`form-check-label small text-secondary ${labelClassName}`.trim()}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
        </div>
    );
}

export default CheckBox;
