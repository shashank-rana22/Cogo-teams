import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListMargins = ({ defaultParams = {} }) => {
	const [data, setData] = useState({});
	const [filterParams, setFilterParams] = useState({ margin_type: 'demand', service: '', status: 'active' });
	const [params, setParams] = useState({ page: 1 });
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_margins',
			params : {
				filters: {
					...(filterParams || {}),
				},
				...(defaultParams || {}),
				...(params || {}),
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
		params,
		setParams,
		trigger,
	};
};
export default useListMargins;
