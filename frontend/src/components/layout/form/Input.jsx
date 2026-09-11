import { useState } from "react";

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
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, "-");
    const isPasswordType = type === "password";

    const inputProps = {
        id: inputId,
        type: isPasswordType && showPassword ? "text" : type,
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
        <div className="form-floating mb-3 position-relative">
            <input {...inputProps} />
            <label htmlFor={inputId}>{label}</label>

            {isPasswordType && (
                <button
                    type="button"
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y border-0 text-secondary p-0 me-3"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    style={{ zIndex: 5 }}
                >
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
            )}

            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

export default Input;
