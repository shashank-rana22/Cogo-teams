import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

// const STAKEHOLDER_MAPPINGS = {
// 	booking_desk : 'service_ops',
// 	lastmile_ops : 'lastmile_ops',
// };

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	showMyTasks = true,
	activeStakeholder,
}) {
	const { profile } = useSelector((state) => state);

	const user_id = profile?.user?.id;

	// const stakeholder = STAKEHOLDER_MAPPINGS[activeStakeholder] || '';

	// const showTaskFilters = stakeholder ? { [`${stakeholder}_id`]: user_id } : {};
	const showTaskFilters = { [`${activeStakeholder}_id`]: user_id } || {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_cfs/list_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
				...showTaskFilters,
				...(showMyTasks ? { show_my_tasks: true } : null),
			},
		},

	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters, showMyTasks]);

	return {
		loading,
		refetch : apiTrigger,
		list    : data,
	};
}

export default useListTasks;
