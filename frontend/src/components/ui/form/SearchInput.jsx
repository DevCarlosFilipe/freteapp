import styles from "./SearchInput.module.css";

function SearchInput({ id = "search-input", placeholder, value, onChange, onClear }) {
    return (
        <div className={`form-floating ${styles.searchInput}`}>
            <i className={`bi bi-search ${styles.searchInputIcon}`} aria-hidden="true" />
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form-control"
            />
            <label htmlFor={id}>{placeholder}</label>
            {value && onClear && (
                <button
                    type="button"
                    className={styles.clearButton}
                    aria-label="Limpar busca"
                    onClick={onClear}
                >
                    <i className="bi bi-x-lg" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}

export default SearchInput;