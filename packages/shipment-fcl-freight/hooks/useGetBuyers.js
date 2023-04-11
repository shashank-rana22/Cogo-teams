import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

function useGetBuyers({ shipment_id }) {
	const [{ data }, trigger] = useRequest({
		url    : 'fcl_freight/get_buyers',
		method : 'GET',
	}, { manual: true });

	const listBuyerServices = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						shipment_id,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, shipment_id]);

	useEffect(() => {
		if (shipment_id) listBuyerServices();
	}, [listBuyerServices, shipment_id]);

	return {
		data,

	};
}

export default useGetBuyers;
