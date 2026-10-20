// hooks/useOrders.js
import useAPI from "./useAPI";

/**
 * Único lugar que sabe o nome da action "orders.list" e o formato
 * da resposta. Todo o resto do app só usa o hook, sem saber que por
 * baixo é o useAPI/fetch — mesmo princípio do useActionForm no Auth.
 */
function useOrders() {
    const { data, loading, error } = useAPI({
        action: "orders.list",
        method: "post"
    });

    return {
        orders: data?.data?.orders || [],
        loading,
        error,
        success: Boolean(data?.success),
        message: data?.message
    };
}

export default useOrders;