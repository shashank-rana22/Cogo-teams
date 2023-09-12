import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListMargins = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [data, setData] = useState({});
	const [filterParams, setFilterParams] = useState({ page: 1, margin_type: 'demand', service: '' });
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_margins',
			params : {
				filters: {
					...(defaultFilters),
					...(filterParams),
				},
				...(defaultParams),
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			setData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data,
		loading,
		apiTrigger,
		filterParams,
		setFilterParams,
	};
};
export default useListMargins;
