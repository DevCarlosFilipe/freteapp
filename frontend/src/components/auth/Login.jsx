function Login({
    close,
    register,
    forgotPassword
}) {

    return (
        <div>

            <h2>Entrar</h2>

            <p>
                Formulário de login aqui.
            </p>

            <button onClick={register}>
                Criar conta
            </button>

            <button onClick={forgotPassword}>
                Esqueci minha senha
            </button>

        </div>
    );
}

export default Login;