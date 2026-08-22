function HelloWorld(props) {
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>Welcome to the React application.</p>
            <p>frase do dia: {props.frase}</p>
        </div>
    );
}

export default HelloWorld;