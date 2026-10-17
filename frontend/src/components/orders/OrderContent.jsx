import OrderSection from "./OrderSection";

function OrderContent() {
    const dataAndamento = [
        {
            "# Pedido": "#000128",
            Cliente: "João Silva · (11) 98765-4321",
            "Origem → Destino": "São Paulo - SP → Rio de Janeiro - RJ",
            Status: "Em rota",
            Previsão: "Hoje, 14:30",
            Valor: "R$ 120,00",
            Ações: "Ver detalhes"
        },
        {
            "# Pedido": "#000127",
            Cliente: "Ana Costa · (21) 99876-5432",
            "Origem → Destino": "Belo Horizonte - MG → São Paulo - SP",
            Status: "Em rota",
            Previsão: "Hoje, 18:00",
            Valor: "R$ 250,00",
            Ações: "Ver detalhes"
        },
        {
            "# Pedido": "#000126",
            Cliente: "Carlos Mendes · (31) 91234-5678",
            "Origem → Destino": "Curitiba - PR → Florianópolis - SC",
            Status: "Em análise",
            Previsão: "Amanhã, 09:00",
            Valor: "R$ 180,00",
            Ações: "Ver detalhes"
        },
        {
            "# Pedido": "#000125",
            Cliente: "Fernanda Lima · (41) 99887-6655",
            "Origem → Destino": "Porto Alegre - RS → São Paulo - SP",
            Status: "Em rota",
            Previsão: "Amanhã, 16:20",
            Valor: "R$ 320,00",
            Ações: "Ver detalhes"
        }
    ];
    const dataFinalizados = [
        {
            "# Pedido": "#000124",
            Cliente: "Lucas Pereira · (21) 98765-43210",
            "Origem → Destino": "Salvador - BA → Recife - PE",
            Status: "Entregue",
            Entrega: "12/05/2025 · 14:32",
            Valor: "R$ 190,00",
            Ações: "Ver detalhes"
        },
        {
            "# Pedido": "#000123",
            Cliente: "Mariana Alves · (11) 98765-1234",
            "Origem → Destino": "Brasília - DF → Goiânia - GO",
            Status: "Entregue",
            Entrega: "11/05/2025 · 10:15",
            Valor: "R$ 220,00",
            Ações: "Ver detalhes"
        },
        {
            "# Pedido": "#000122",
            Cliente: "Pedro Santos · (51) 99876-4321",
            "Origem → Destino": "Porto Alegre - RS → Curitiba - PR",
            Status: "Cancelado",
            Entrega: "10/05/2025 · 16:45",
            Valor: "R$ 160,00",
            Ações: "Ver detalhes"
        }
    ];
    return (
        <div className="tab-content" id="orderContent">
            <div className="tab-pane show active" id="ordersResume" role="tabpanel" aria-labelledby="pills-resume-tab" tabIndex="0">
                <OrderSection
                    title="Pedidos em andamento"
                    icon="clock"
                    label="Pedidos que estão sendo analisados, em rota ou proximos da entrega "
                    data={dataAndamento}
                />
                <OrderSection
                    title="Pedidos finalizados"
                    icon="check2"
                    label="Pedidos entregues, cancelados ou com outros status final"
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