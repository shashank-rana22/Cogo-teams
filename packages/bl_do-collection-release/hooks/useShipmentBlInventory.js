import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useShipmentBlInventory = () => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url: '/list_shipment_bl_inventory',
	}, { manual: true });

	const apiTrigger = async () => {
		try {
			const res = await trigger();
			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	};

	return {
		data: apiData, apiTrigger, loading,
	};
};

export default useShipmentBlInventory;
