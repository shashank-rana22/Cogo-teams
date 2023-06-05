import { useRequestBf } from '@cogoport/request';

const useGetExchangeRate = ({ billId }) => {
	const [{ data, loading: exchangeRateloading }] = useRequestBf(
		{
			url     : `/purchase/bills/exchange-rate-deviation/${billId}`,
			method  : 'get',
			authKey : 'get_purchase_bills_exchange_rate_deviation_by_id',
		},
		{ manual: false },
	);

	return {
		exchangeRateloading,
		data,
	};
};

export default useGetExchangeRate;
