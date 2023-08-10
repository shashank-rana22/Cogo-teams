import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListCurrencyConversion = ({ shipment_id = '' }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/list_shipment_currency_conversions',
		method : 'GET',
	});

	const getCurrencyConversion = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: { filters: { shipment_id } },
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [shipment_id, trigger]);

	useEffect(() => {
		getCurrencyConversion();
	}, [getCurrencyConversion]);

	return {
		getCurrencyConversion,
		currencyConversionData: data?.list,
	};
};

export default useListCurrencyConversion;
