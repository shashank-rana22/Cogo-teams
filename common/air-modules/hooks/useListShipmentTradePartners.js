import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListShipmentTradePartners = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_trade_partners',
		params : {
			filters: {
				shipment_id,
			},
			add_service_objects_required : true,
			page_limit                   : 20,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};

export default useListShipmentTradePartners;
