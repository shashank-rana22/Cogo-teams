const getAvailableRatesDetails = ({
	systemFormatedRates,
	currentFormatedrates,
}) => {
	const availableRatesForRDSystem = (systemFormatedRates?.rows || []).map((rate) => (
		{
			rate_id                              : rate?.id,
			allocation_ratio                     : rate?.rowData?.allocation_ratio,
			fulfillment_ratio                    : rate?.rowData?.fulfillment_ratio,
			active_bookings                      : rate?.rowData?.active_booking,
			buy_price                            : rate?.rowData?.total_buy_price,
			buy_price_currency                   : rate?.rowData?.total_buy_currency,
			origin_local_buy_price               : rate?.rowData?.origin_locals_price,
			destination_local_buy_price          : rate?.rowData?.destination_locals_price,
			origin_local_buy_price_currency      : rate?.rowData?.origin_locals_currency,
			destination_local_buy_price_currency : rate?.rowData?.destination_locals_currency,
		}
	));
	const availableRatesForRDFlashed = (currentFormatedrates?.rows || []).map((rate) => (
		{
			rate_id                              : rate?.id,
			allocation_ratio                     : rate?.rowData?.allocation_ratio,
			fulfillment_ratio                    : rate?.rowData?.fulfillment_ratio,
			active_bookings                      : rate?.rowData?.active_booking,
			buy_price                            : rate?.rowData?.total_buy_price,
			buy_price_currency                   : rate?.rowData?.total_buy_currency,
			origin_local_buy_price               : rate?.rowData?.origin_locals_price,
			destination_local_buy_price          : rate?.rowData?.destination_locals_price,
			origin_local_buy_price_currency      : rate?.rowData?.origin_locals_currency,
			destination_local_buy_price_currency : rate?.rowData?.destination_locals_currency,
		}
	));

	return [...availableRatesForRDSystem, ...availableRatesForRDFlashed];
};
export default getAvailableRatesDetails;
