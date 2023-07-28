import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const SHOW_ALL_TASKS = ['manager', 'admin'];

const STAKEHOLDER_MAPPINGS = {
	booking_desk  : 'service_ops',
	lastmile_ops  : 'lastmile_ops',
	document_desk : 'service_ops',
	so1_so2_ops   : 'service_ops',
	booking_agent : 'booking_agent',
};

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	showMyTasks = true,
	activeStakeholder,
}) {
	let showOnlyMyTasks = showMyTasks;
	const { profile } = useSelector((state) => state);

	const user_id = profile?.user?.id;

	const stakeholder = STAKEHOLDER_MAPPINGS[activeStakeholder] || '';

	const showTaskFilters = stakeholder ? { [`${stakeholder}_id`]: user_id } : {};

	SHOW_ALL_TASKS.forEach((item) => {
		if (activeStakeholder.includes(item)) {
			showOnlyMyTasks = false;
		}
	});

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
				...showTaskFilters,
				...(showOnlyMyTasks ? { show_my_tasks: true } : null),
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
