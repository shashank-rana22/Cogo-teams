import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListStakeholders = ({ shipment_id = '', stakeholder_type = '' }) => {
	const [apiData, setApiData] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_stakeholders',
		params : {
			filters: {
				shipment_id,
				stakeholder_type: stakeholder_type || undefined,
			},
			page_limit : 50,
			sort_by    : 'created_at',
			sort_type  : 'desc',
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

export default useListStakeholders;
