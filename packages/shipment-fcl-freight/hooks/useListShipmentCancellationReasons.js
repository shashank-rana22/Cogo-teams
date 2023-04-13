import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useCallback } from 'react';

export default function useListShipmentCancellationReasons() {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_shipment_cancellation_reasons',
		method : 'GET',
	}, { manual: true });

	const getReasons = useCallback(async (payload) => {
		try {
			const res = await trigger({
				params: payload,
			});

			setApiData(res?.data || []);
		} catch (err) {
			setApiData([]);
			toastApiError(err);
		}
	}, [trigger]);

	return {
		getReasons,
		reasons        : apiData,
		reasonsLoading : loading,
	};
}
