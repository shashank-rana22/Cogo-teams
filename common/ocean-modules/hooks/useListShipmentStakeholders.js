import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const DEFAULT_PAGE_LIMIT = 50;
const DEFAULT_SORT_BY = 'created_at';
const DEFAULT_SORT_TYPE = 'desc';

const useListStakeholders = ({ shipment_id = '' }) => {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_stakeholders',
		params : {
			filters: {
				shipment_id,
			},
			page_limit : DEFAULT_PAGE_LIMIT,
			sort_by    : DEFAULT_SORT_BY,
			sort_type  : DEFAULT_SORT_TYPE,
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
