import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { toastApiError } from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const STAKEHOLDER_MAPPINGS = {
	booking_desk  : 'service_ops',
	lastmile_ops  : 'lastmile_ops',
	document_desk : 'service_ops',
	so1_so2_ops   : 'service_ops',
};

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	showMyTasks = true,
	activeStakeholder = 'superadmin',
}) {
	const { profile } = useSelector((state) => state);

	const user_id = profile?.user?.id;

	const stakeholder = STAKEHOLDER_MAPPINGS[activeStakeholder] || '';

	const showTaskFilters = stakeholder ? { [`${stakeholder}_id`]: user_id } : {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
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
