import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListMargins = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [data, setData] = useState({});

	const [filterParams, setFilterParams] = useState({ ...(defaultFilters || {}) });

	const [marginBreakupData, setMarginBreakupData] = useState({});

	const [activeTab, setActivetab] = useState('demand');

	const [activeService, setActiveService] = useState('fcl_freight');

	const { page = 1, ...restFilters } = (filterParams || {});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_margins',
			params : {
				filters: {
					...(defaultFilters || {}),
					...(restFilters || {}),
					service: activeTab !== 'approval_pending' ? activeService : undefined,
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
	}, [apiTrigger, filterParams]);

	useEffect(() => {
		setFilterParams((pv) => ({
			...pv,
			page: 1,
		}));
	}, [activeTab, setActiveService]);

	return {
		data,
		loading,
		apiTrigger,
		filterParams,
		setFilterParams,
		trigger,
		marginBreakupData,
		setMarginBreakupData,
		activeTab,
		setActivetab,
		activeService,
		setActiveService,
	};
};
export default useListMargins;
