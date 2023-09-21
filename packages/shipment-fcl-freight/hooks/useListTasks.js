import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useContext, useEffect, useCallback } from 'react';

const SHOW_ALL_TASKS = ['manager', 'admin'];

const geo = getGeoConstants();

const is_indonesia_coe_head = geo.navigations.partner.bookings.pending_tasks.is_booking_agent_filter_required;

const STAKEHOLDER_MAPPINGS = {
	booking_desk                    : 'service_ops',
	lastmile_ops                    : 'lastmile_ops',
	document_desk                   : 'service_ops',
	so1_so2_ops                     : 'service_ops',
	booking_agent                   : 'booking_agent',
	booking_agent_manager           : 'booking_agent',
	sales_agent                     : 'sales_agent',
	consignee_shipper_booking_agent : 'booking_agent',
	coe_head                        : is_indonesia_coe_head ? 'booking_agent' : undefined,
};

function useListTasks({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
	showMyTasks = true,
	activeStakeholder = '',
}) {
	let showOnlyMyTasks = showMyTasks;
	const { profile } = useSelector((state) => state);
	const { refetchServices = () => {}, shipment_data = {} } = useContext(ShipmentDetailContext);

	const { stakeholders = [] } = shipment_data || {};

	let updatedActiveStakeholder = activeStakeholder;

	let isBookingAgent = false;
	let isSalesAgent = false;

	stakeholders.forEach((item) => {
		if (item?.stakeholder_type === 'sales_agent') {
			isSalesAgent = true;
		}

		if (item?.stakeholder_type === 'booking_agent') {
			isBookingAgent = true;
		}
	});

	if (isSalesAgent && !isBookingAgent) { updatedActiveStakeholder = 'sales_agent'; }

	const user_id = profile?.user?.id;

	const stakeholder = STAKEHOLDER_MAPPINGS[updatedActiveStakeholder] || '';

	let showTaskFilters = stakeholder ? { [`${stakeholder}_id`]: user_id } : {};

	if (updatedActiveStakeholder === 'lastmile_ops' && !showOnlyMyTasks) {
		showTaskFilters = {};
	}
	SHOW_ALL_TASKS.forEach((item) => {
		if (updatedActiveStakeholder?.includes(item)) {
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
				...(showOnlyMyTasks ? { show_my_tasks: true } : {}),
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
