import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useListMargins = ({ defaultParams = {}, defaultFilters = {} }) => {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => ({
		authParams        : profile?.authParams,
		selected_agent_id : profile?.selected_agent_id,
	}));

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
					agent_id : selected_agent_id || undefined,
					status   : 'active',
					...(defaultFilters || {}),
					...(restFilters || {}),
					service  : activeTab !== 'approval_pending' ? activeService : undefined,
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
	}, [
		apiTrigger,
		filterParams,
		authParams,
		selected_agent_id,
	]);

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
