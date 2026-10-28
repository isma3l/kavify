export function formatPrice(amountInCents: number, currency: string, locale?: string) {
    const amount = amountInCents / 100;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency, // 'EUR', 'USD', 'GBP', etc. — viene del API
    }).format(amount);
}