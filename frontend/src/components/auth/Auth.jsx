import AuthForm from "./AuthForm";
import AuthTrigger from "./AuthTrigger";

/**
 * Porta de entrada única do Auth — é só isso que o resto do site
 * precisa conhecer para usar autenticação em qualquer lugar.
 *
 * Modo formulário — vira um <form> ligado a uma action:
 *     <Auth action="auth.login">{...}</Auth>
 *
 * Modo gatilho — vira um disparador que abre login/registro
 * num drawer, plantável em qualquer botão do site:
 *     <Auth>{({ login, register }) => ...}</Auth>
 */
function Auth({ children, action, onSuccess }) {
    if (action) {
        return (
            <AuthForm action={action} onSuccess={onSuccess}>
                {children}
            </AuthForm>
        );
    }

    return (
        <AuthTrigger>
            {children}
        </AuthTrigger>
    );
}

export default Auth;