import PillBox from "../ui/PillBox";

const statusLabels = {
    pending_review: "Em análise",
    rejected: "Reprovado",
    awaiting_pickup: "Aguardando coleta",
    collected: "Coletado",
    in_transit: "Em rota",
    nearby: "Chegando",
    delivered: "Entregue",
    cancelled: "Cancelado",
    returned: "Devolvido"
};

const statusColors = {
    pending_review: "info",
    rejected: "negative",
    awaiting_pickup: "warning",
    collected: "positive",
    in_transit: "positive",
    nearby: "info",
    delivered: "positive",
    cancelled: "negative",
    returned: "neutral"
};

const statusIcons = {
    pending_review: "clock",
    rejected: "x-circle-fill",
    awaiting_pickup: "hourglass-split",
    collected: "box-seam-fill",
    in_transit: "rocket-takeoff",
    nearby: "geo-alt-fill",
    delivered: "check-circle-fill",
    cancelled: "slash-circle-fill",
    returned: "arrow-counterclockwise"
};

function OrderStatus({ status }) {
    return (
        <PillBox
            text={statusLabels[status] || status}
            status={statusColors[status] || "null"}
            icon={statusIcons[status]}
        />
    );
}

export default OrderStatus;