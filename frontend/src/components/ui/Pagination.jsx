import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`${styles.button} ${i === currentPage ? styles.active : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span aria-hidden="true">&laquo;</span>
            </button>
            {renderPageNumbers()}
            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <span aria-hidden="true">&raquo;</span>
            </button>
        </div>
    );
}

export default Pagination;