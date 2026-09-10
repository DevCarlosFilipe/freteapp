function Input({
    id,
    label,
    type = "text",
    name,
    value,
    defaultValue,
    onChange,
    placeholder,
    error,
    className = "",
    ...props
}) {
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");

    const inputProps = {
        id: inputId,
        type,
        name,
        className: `form-control ${error ? "is-invalid" : ""} ${className}`.trim(),
        placeholder: placeholder || label || " ",
        "aria-invalid": Boolean(error),
        ...props,
    };

    if (value !== undefined) {
        inputProps.value = value;
    }

    if (defaultValue !== undefined) {
        inputProps.defaultValue = defaultValue;
    }

    if (onChange) {
        inputProps.onChange = onChange;
    }

    return (
        <div className="form-floating mb-3">
            <input {...inputProps} />
            <label htmlFor={inputId}>{label}</label>

            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

export default Input;
