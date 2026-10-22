import SearchInput from "../ui/form/SearchInput";

function OrderSearch({ value, onSearch }) {
    const handleSearch = (event) => {
        onSearch(event.target.value);
    };

    return (
        <SearchInput
            placeholder="Buscar por número do pedido, cliente ou destino..."
            value={value}
            onChange={handleSearch}
        />
    );
}

export default OrderSearch;