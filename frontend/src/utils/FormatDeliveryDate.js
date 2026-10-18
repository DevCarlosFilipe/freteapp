// O MySQL devolve DATETIME como "2026-07-24 15:00:00" (espaço, sem "T"),
// e DATE como "2026-07-24" (sem hora nenhuma). O Date() nativo do
// navegador nem sempre entende o formato com espaço de forma confiável,
// então normalizamos pra "T" antes de criar o objeto Date.
function parseBackendDate(value) {
    if (!value) {
        return null;
    }

    const normalized = value.includes(" ") ? value.replace(" ", "T") : value;
    const date = new Date(normalized);

    return Number.isNaN(date.getTime()) ? null : date;
}

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Formata uma data vinda do backend (estimated_delivery_at ou
 * requested_pickup_date) como "Hoje, 14:30", "Amanhã, 09:00",
 * ou "24/07, 15:00" para datas mais distantes. Quando o valor não
 * tem hora (campo DATE puro, como requested_pickup_date), omite
 * o horário do rótulo.
 */
export function formatDeliveryDate(value) {
    const date = parseBackendDate(value);

    if (!date) {
        return "A definir";
    }

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const hasTime = typeof value === "string" && value.includes(":");
    const time = hasTime
        ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        : null;

    if (isSameDay(date, now)) {
        return time ? `Hoje, ${time}` : "Hoje";
    }

    if (isSameDay(date, tomorrow)) {
        return time ? `Amanhã, ${time}` : "Amanhã";
    }

    const dateLabel = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    });

    return time ? `${dateLabel}, ${time}` : dateLabel;
}