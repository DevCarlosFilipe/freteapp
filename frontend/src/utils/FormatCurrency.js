const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

/**
 * Formata um valor numérico (ou string vinda do PDO, que devolve
 * DECIMAL como texto) como "R$ 120,00". Pedidos ainda não precificados
 * (price = NULL no banco) caem como "A calcular", não "R$ 0,00".
 */
export function formatCurrency(value) {
    if (value === null || value === undefined || value === "") {
        return "A calcular";
    }

    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (Number.isNaN(numericValue)) {
        return "A calcular";
    }

    return currencyFormatter.format(numericValue);
}