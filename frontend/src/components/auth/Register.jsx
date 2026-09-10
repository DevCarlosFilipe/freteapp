function Register({ close, login }) {
    return (
        <div>
            <h2>Criar conta</h2>

            <p>
                Formulário de cadastro aqui.
            </p>

            <button onClick={login}>
                Já tenho conta
            </button>

            <button onClick={close}>
                Fechar
            </button>
        </div>
    );
}

export default Register;
