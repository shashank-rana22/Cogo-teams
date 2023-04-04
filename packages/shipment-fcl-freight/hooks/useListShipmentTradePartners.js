import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

const useListShipmentTradePartners = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { designation, origin_location_id } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_trade_partners',
		params : {
			filters: {
				shipment_id,
			},
			poc_filters: {
				work_scopes : designation || undefined,
				location_id : origin_location_id || undefined,
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			Toast.error(getApiErrorString(err));
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		setFilters,
		filters,
		data: apiData,
		apiTrigger,
	};
};

export default useListShipmentTradePartners;
