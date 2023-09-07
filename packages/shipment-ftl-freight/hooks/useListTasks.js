import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

const STAKEHOLDER_MAPPINGS = {
	booking_desk  : 'service_ops1',
	lastmile_ops  : 'lastmile_ops',
	document_desk : 'service_ops2',
	so1_so2_ops   : 'service_ops',
};

const STAKEHOLDER_ARRAY = [
	'booking_agent',
	'service_ops1',
	'service_ops2',
	'service_ops3',
];

const OTHER_STAKEHOLDERS = ['kam_so1'];

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	showMyTasks = true,
	activeStakeholder = '',
}) {
	const { profile } = useSelector((state) => state);

	const user_id = profile?.user?.id;
	let stakeholder = activeStakeholder;

	if (OTHER_STAKEHOLDERS.includes(stakeholder)) {
		stakeholder = (profile?.authParams?.split(':') || []).pop();
	}

	stakeholder = STAKEHOLDER_MAPPINGS[stakeholder] ?? stakeholder;

	const showTaskFilters = stakeholder ? {
		[`${stakeholder}_id`]      : user_id,
		show_stakeholders_all_task : STAKEHOLDER_ARRAY.includes(stakeholder) ? stakeholder : undefined,
		show_my_tasks              : true,
	} : {};

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_pending_tasks',
		method : 'GET',
		params : {
			...defaultParams,
			filters: {
				...defaultFilters,
				...filters,
				...(showMyTasks ? showTaskFilters : {}),
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
