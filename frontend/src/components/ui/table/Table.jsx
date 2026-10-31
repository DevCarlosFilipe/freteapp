import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import TableNoData from "./TableNoData";
import TableMobile from "./TableMobile";
import TablePagination from "./TablePagination";

const mobileBreakpoint = "(max-width: 767.98px)";

function Table({ columns, data, caption, limit = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobileViewport, setIsMobileViewport] = useState(() =>
        typeof window !== "undefined" && window.matchMedia(mobileBreakpoint).matches
    );
    const [showMobileTable, setShowMobileTable] = useState(() =>
        typeof window !== "undefined" && window.matchMedia(mobileBreakpoint).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(mobileBreakpoint);
        const handleViewportChange = (event) => {
            setIsMobileViewport(event.matches);
            setShowMobileTable(event.matches);
        };

        mediaQuery.addEventListener("change", handleViewportChange);
        return () => mediaQuery.removeEventListener("change", handleViewportChange);
    }, []);

    if (!data || data.length === 0) {
        return <TableNoData />;
    }

    const viewToggle = isMobileViewport && (
        <div className={styles.viewToggle} role="group" aria-label="Visualização da tabela">
            <button
                type="button"
                className={`${styles.viewToggleButton} ${!showMobileTable ? styles.viewToggleButtonActive : ""}`}
                aria-label="Tabela completa"
                aria-pressed={!showMobileTable}
                onClick={() => setShowMobileTable(false)}
            >
                <i className="bi bi-table" aria-hidden="true"></i>
            </button>
            <button
                type="button"
                className={`${styles.viewToggleButton} ${showMobileTable ? styles.viewToggleButtonActive : ""}`}
                aria-label="Tabela reduzida"
                aria-pressed={showMobileTable}
                onClick={() => setShowMobileTable(true)}
            >
                <i className="bi bi-card-list" aria-hidden="true"></i>
            </button>
        </div>
    );

    if (showMobileTable) {
        return (
            <>
                {viewToggle}
                <TableMobile columns={columns} data={data} caption={caption} limit={limit} />
            </>
        );
    }

    const shouldPaginate = Number.isFinite(limit) && limit > 0 && data.length > limit;
    const totalPages = shouldPaginate ? Math.ceil(data.length / limit) : 1;
    const page = Math.min(currentPage, totalPages);
    const startIndex = shouldPaginate ? (page - 1) * limit : 0;
    const displayedData = shouldPaginate
        ? data.slice(startIndex, startIndex + limit)
        : data;

    return (
        <>
            {viewToggle}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    {caption && (
                        <caption className={styles.caption}>{caption}</caption>
                    )}
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.header}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {displayedData.map((row, rowIndex) => (
                            <tr key={row.id ?? startIndex + rowIndex}>
                                {columns.map((column) => (
                                    <td key={column.key}>
                                        {column.render ? column.render(row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {shouldPaginate && (
                <TablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={setCurrentPage}
                />
            )}
        </>
    );
}

export default Table;