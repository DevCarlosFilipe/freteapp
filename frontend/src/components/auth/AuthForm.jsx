import useActionForm from "../../hooks/useActionForm";

/**
 * Modo formulário do Auth: transforma os children num <form>
 * ligado a uma action do backend.
 *
 * <AuthForm action="auth.login">
 *     {({ loading, error }) => (...)}
 * </AuthForm>
 */
function AuthForm({ action, onSuccess, children }) {
    const {
        formRef,
        handleSubmit,
        loading,
        error,
        errorField,
        success,
        data
    } = useActionForm({ action, onSuccess });

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
        >
            {typeof children === "function"
                ? children({ data, loading, error, errorField, success })
                : children
            }
        </form>
    );
}

export default AuthForm;