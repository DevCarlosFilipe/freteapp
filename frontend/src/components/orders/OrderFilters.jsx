import NavPillsButton from "../ui/NavPillsButton";

function OrderFilters({ orders = [] }) {
    const orderFilters = orders.filter((order) => !order.isHistory);
    return (
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <NavPillsButton text="Todos" icon="list" id="pills-resume-tab" dataBsTarget="#ordersResume" active={true} />
            <NavPillsButton text="Em andamento" icon="clock" id="pills-in-progress-tab" dataBsTarget="#ordersFilter" />
            <NavPillsButton text="Entregues" icon="check2" id="pills-completed-tab" dataBsTarget="#ordersFilter" />
            <NavPillsButton text="Cancelados" icon="x-lg" id="pills-cancelled-tab" dataBsTarget="#ordersFilter" />
            <NavPillsButton text="Devolvidos" icon="arrow-return-left" id="pills-refunded-tab" dataBsTarget="#ordersFilter" />
        </ul>
    );
}

export default OrderFilters;