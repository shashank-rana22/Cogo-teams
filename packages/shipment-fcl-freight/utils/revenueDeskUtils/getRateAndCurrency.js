const getRateAndCurrency = (line_items) => {
    let currency = null;
    let rate = null;
    let is_rate_expired = null;
    (line_items || []).forEach((row) => {
        if (row?.code === 'BAS') {
            rate = row?.tax_total_price;
            currency = row?.currency;
            is_rate_expired = row?.is_rate_expired;
        }
    });
    return { currency, rate, is_rate_expired };
};

export default getRateAndCurrency;