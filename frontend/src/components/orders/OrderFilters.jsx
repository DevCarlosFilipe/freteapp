import NavPillsButton from "../ui/NavPillsButton";

function OrderFilters({ activeFilter, onChange }) {
    return (
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <NavPillsButton text="Todos" icon="list" id="pills-resume-tab" dataBsTarget="#ordersResume" active={activeFilter === "all"} onClick={() => onChange("all")} />
            <NavPillsButton text="Em andamento" icon="clock" id="pills-in-progress-tab" dataBsTarget="#ordersFilter" active={activeFilter === "in_progress"} onClick={() => onChange("in_progress")} />
            <NavPillsButton text="Entregues" icon="check2" id="pills-completed-tab" dataBsTarget="#ordersFilter" active={activeFilter === "finalized"} onClick={() => onChange("finalized")} />
            <NavPillsButton text="Cancelados" icon="x-lg" id="pills-cancelled-tab" dataBsTarget="#ordersFilter" active={activeFilter === "cancelled"} onClick={() => onChange("cancelled")} />
            <NavPillsButton text="Devolvidos" icon="arrow-return-left" id="pills-refunded-tab" dataBsTarget="#ordersFilter" active={activeFilter === "returned"} onClick={() => onChange("returned")} />
        </ul>
    );
}

export default OrderFilters;