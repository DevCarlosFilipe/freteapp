function OrderContent() {
    return (
        <div class="tab-content" id="orderContent">
            <div class="tab-pane show active" id="ordersResume" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <p>Aqui irá aparecer o resumo dos pedidos.</p>
            </div>
            <div class="tab-pane" id="ordersFilter" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                <p>Aqui irá aparecer o filtro de pedidos.</p>
            </div>
        </div>
    );
}

export default OrderContent;