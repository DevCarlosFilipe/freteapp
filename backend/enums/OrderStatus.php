<?php

/**
 * Vocabulário de status do pedido. Fonte única da verdade:
 * o OrdersController (quando existir) só deve usar esses códigos,
 * e o frontend deve mapear visual a partir deles — nunca inventar
 * um status novo direto no componente.
 *
 * Os rótulos aqui são só de apoio (ex: para mensagens de e-mail
 * futuras). O frontend mantém sua própria tradução/estilo por código,
 * já que rótulo é preocupação de apresentação, não de domínio.
 */
class OrderStatus
{
    public const PENDING_REVIEW = 'pending_review';
    public const REJECTED = 'rejected';
    public const AWAITING_PICKUP = 'awaiting_pickup';
    public const COLLECTED = 'collected';
    public const IN_TRANSIT = 'in_transit';
    public const NEARBY = 'nearby';
    public const DELIVERED = 'delivered';
    public const CANCELLED = 'cancelled';
    public const RETURNED = 'returned';

    private const LABELS = [
        self::PENDING_REVIEW => 'Em análise',
        self::REJECTED => 'Reprovado',
        self::AWAITING_PICKUP => 'Aguardando coleta',
        self::COLLECTED => 'Coletado',
        self::IN_TRANSIT => 'Em rota',
        self::NEARBY => 'Chegando',
        self::DELIVERED => 'Entregue',
        self::CANCELLED => 'Cancelado',
        self::RETURNED => 'Devolvido',
    ];

    // Status que não devem mais mudar depois de alcançados.
    private const TERMINAL = [
        self::REJECTED,
        self::DELIVERED,
        self::CANCELLED,
        self::RETURNED,
    ];

    public static function all(): array
    {
        return array_keys(self::LABELS);
    }

    public static function isValid(string $status): bool
    {
        return array_key_exists($status, self::LABELS);
    }

    public static function isTerminal(string $status): bool
    {
        return in_array($status, self::TERMINAL, true);
    }

    public static function label(string $status): string
    {
        return self::LABELS[$status] ?? $status;
    }
}