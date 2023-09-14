import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const SUMARY_API = {
	ocean : '/list_saas_container_subscriptions_summary',
	air   : '/list_saas_air_subscriptions_summary',
};

const useGetSummary = () => {
	const { query } = useRouter();
	const { branch_id, activeTab: trackingType } = query;
	const [globalFilter, setGlobalFilter] = useState({
		page            : 1,
		activeTab       : trackingType || 'ocean',
		shipment_status : '',
		period_in_days  : '',
	});
	const { activeTab } = globalFilter;

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : SUMARY_API[activeTab],
	}, { manual: true });

	const getSummary = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						period_in_days         : globalFilter?.period_in_days,
						organization_branch_id : branch_id,
						shipment_status        : globalFilter?.shipment_status,
					},
					page                 : globalFilter.page,
					page_limit           : 7,
					filter_data_required : true,
				},
			});
		} catch (err) {
			console.error(err);
		}
	}, [branch_id, trigger, globalFilter]);

	useEffect(() => {
		getSummary();
	}, [getSummary, globalFilter]);

	return {
		globalFilter,
		setGlobalFilter,
		data,
		loading,
	};
};

export default useGetSummary;
