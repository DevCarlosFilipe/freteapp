import OrderSection from "./OrderSection";
import OrdersTableColumns from "./OrdersTableColumns";

function OrderContent() {
    const dataAndamento = [
        {
            id: 128,
            code: "000128",
            recipientName: "João Silva",
            recipientPhone: "(11) 98765-4321",
            originLabel: "São Paulo - SP",
            destinationLabel: "Rio de Janeiro - RJ",
            status: "in_transit",
            estimatedDeliveryAt: "2026-10-17 14:30:00",
            price: 120
        },
        {
            id: 127,
            code: "000127",
            recipientName: "Ana Costa",
            recipientPhone: "(21) 99876-5432",
            originLabel: "Belo Horizonte - MG",
            destinationLabel: "São Paulo - SP",
            status: "in_transit",
            estimatedDeliveryAt: "2026-10-17 18:00:00",
            price: 250
        },
        {
            id: 126,
            code: "000126",
            recipientName: "Carlos Mendes",
            recipientPhone: "(31) 91234-5678",
            originLabel: "Curitiba - PR",
            destinationLabel: "Florianópolis - SC",
            status: "pending_review",
            estimatedDeliveryAt: "2026-10-18 09:00:00",
            price: 180
        },
        {
            id: 125,
            code: "000125",
            recipientName: "Fernanda Lima",
            recipientPhone: "(41) 99887-6655",
            originLabel: "Porto Alegre - RS",
            destinationLabel: "São Paulo - SP",
            status: "in_transit",
            estimatedDeliveryAt: "2026-10-18 16:20:00",
            price: 320
        }
    ];
    const dataFinalizados = [
        {
            id: 124,
            code: "000124",
            recipientName: "Lucas Pereira",
            recipientPhone: "(21) 98765-43210",
            originLabel: "Salvador - BA",
            destinationLabel: "Recife - PE",
            status: "delivered",
            estimatedDeliveryAt: "2026-10-12 14:32:00",
            price: 190
        },
        {
            id: 123,
            code: "000123",
            recipientName: "Mariana Alves",
            recipientPhone: "(11) 98765-1234",
            originLabel: "Brasília - DF",
            destinationLabel: "Goiânia - GO",
            status: "delivered",
            estimatedDeliveryAt: "2026-10-11 10:15:00",
            price: 220
        },
        {
            id: 122,
            code: "000122",
            recipientName: "Pedro Santos",
            recipientPhone: "(51) 99876-4321",
            originLabel: "Porto Alegre - RS",
            destinationLabel: "Curitiba - PR",
            status: "cancelled",
            estimatedDeliveryAt: "2026-10-10 16:45:00",
            price: 160
        }
    ];
    return (
        <div className="tab-content" id="orderContent">
            <div className="tab-pane show active" id="ordersResume" role="tabpanel" aria-labelledby="pills-resume-tab" tabIndex="0">
                <OrderSection
                    title="Pedidos em andamento"
                    icon="clock"
                    label="Pedidos que estão sendo analisados, em rota ou proximos da entrega "
                    columns={OrdersTableColumns}
                    data={dataAndamento}
                />
                <OrderSection
                    title="Pedidos finalizados"
                    icon="check2"
                    label="Pedidos entregues, cancelados ou com outros status final"
                    columns={OrdersTableColumns}
                    data={dataFinalizados}
                />
            </div>
            <div className="tab-pane" id="ordersFilter" role="tabpanel" aria-labelledby="pills-in-progress-tab" tabIndex="0">
                <OrderSection
                    title="Filtro de pedidos"
                    icon="filter"
                    label="Aqui você pode filtrar seus pedidos."
                    data={[]}
                />
            </div>
        </div>
    );
}

export default OrderContent;