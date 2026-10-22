function applyStatusFilter(orders, filter) {
    switch (filter) {
        case "in_progress":
            return orders.filter((order) => !order.isHistory);
        case "finalized":
            return orders.filter((order) => order.status === "delivered");
        case "cancelled":
            return orders.filter((order) => order.status === "cancelled");
        case "returned":
            return orders.filter((order) => order.status === "returned");
        default:
            return orders;
    }
}

export default applyStatusFilter;
