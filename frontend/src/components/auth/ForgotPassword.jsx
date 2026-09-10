function ForgotPassword({ close, login }) {
    return (
        <div>
            <h2>Recuperar senha</h2>

            <p>
                Formulário de recuperação de senha aqui.
            </p>

            <button onClick={login}>
                Voltar para login
            </button>

            <button onClick={close}>
                Fechar
            </button>
        </div>
    );
}

export default ForgotPassword;
