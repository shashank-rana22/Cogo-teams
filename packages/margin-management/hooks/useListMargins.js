import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListMargins = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [data, setData] = useState({});
	const [filterParams, setFilterParams] = useState(defaultFilters);
	const { page = 1, ...restFilters } = (filterParams || {});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_margins',
			params : {
				filters: {
					...(defaultFilters || {}),
					...(restFilters || {}),
				},
				...(defaultParams || {}),
				page,
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
		trigger,
	};
};
export default useListMargins;
