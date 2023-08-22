import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const ALLOWED_TASKS = ['add_consignee_details', 'add_shipper_details'];

const useListShipmentTradePartners = ({ shipment_id = '', task = {} }) => {
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
		if (ALLOWED_TASKS.includes(task?.task)) {
			apiTrigger();
		}
	}, [apiTrigger, task]);

	return {
		loading,
		data: apiData,
		apiTrigger,
	};
};

export default useListShipmentTradePartners;
