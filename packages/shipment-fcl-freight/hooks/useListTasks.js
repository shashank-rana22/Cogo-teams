import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useContext, useEffect, useCallback } from 'react';

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
	activeStakeholder,
}) {
	const { profile } = useSelector((state) => state);
	const {
		refetchServices,
	} = useContext(ShipmentDetailContext);

	const user_id = profile?.user?.id;

	const stakeholder = STAKEHOLDER_MAPPINGS[activeStakeholder] || '';

	const showTaskFilters = stakeholder ? { [`${stakeholder}_id`]: user_id } : {};

	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_tasks',
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
				refetchServices();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, refetchServices]);

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
