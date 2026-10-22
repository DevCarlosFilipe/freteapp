import Pagination from "../Pagination";

function TablePagination({ currentPage, totalPages, handlePageChange }) {
    return (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    );
}

export default TablePagination;