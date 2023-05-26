import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useContext } from 'react';

const useListCurrencyConversion = () => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ data }, trigger] = useRequest({
		url    : '/list_shipment_currency_conversions',
		method : 'GET',
	});

	const getCurrencyConversion = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: { filters: { shipment_id: shipment_data?.id } },
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [shipment_data?.id, trigger]);

	useEffect(() => {
		getCurrencyConversion();
	}, [getCurrencyConversion]);

	return {
		getCurrencyConversion,
		currencyConversionData: data?.list,
	};
};

export default useListCurrencyConversion;
