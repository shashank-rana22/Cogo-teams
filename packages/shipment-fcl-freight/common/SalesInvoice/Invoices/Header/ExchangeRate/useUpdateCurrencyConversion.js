import { useRequest } from '@cogoport/request';

const useUpdateCurrencyConversion = () => {
	const [trigger] = useRequest({
		url    : '/update_shipment_currency_conversion',
		method : 'POST',
	});

	return {
		rateAddtionApi: trigger,
	};
};

export default useUpdateCurrencyConversion;
