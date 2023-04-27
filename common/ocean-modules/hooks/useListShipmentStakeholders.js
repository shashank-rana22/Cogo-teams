import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListStakeholders = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_stakeholders',
		params : {
			filters: {
				shipment_id,
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
