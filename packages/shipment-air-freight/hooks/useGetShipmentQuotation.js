import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetShipmentQuotation = ({ shipment_id = '' }) => {
	const [{ data }, trigger] = useRequest({
		url    : '/get_shipment_quotation',
		method : 'GET',
	});

	const getQuotation = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: { shipment_id },
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [shipment_id, trigger]);

	useEffect(() => {
		getQuotation();
	}, [getQuotation]);

	return {
		quotationData: data,
	};
};

export default useGetShipmentQuotation;
