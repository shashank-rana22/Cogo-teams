import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useDeleteSchedule = ({ fetchSchedules, schedule = {} }) => {
	const { push } = useRouter();
	const TWO_HUNDRED = 200;
	const [showDelete, setShowDelete] = useState(false);

	const handleViewDetails = () => {
		push(`/saas/air-schedules/${schedule?.id}`);
	};
	const { origin_airport = {}, destination_airport = {} } = schedule || {};

	const originSchedule = origin_airport?.port_code || 'Origin';

	const DestinationSchedule = destination_airport?.port_code || 'Destination';

	const origin_airport_name = origin_airport?.name.split('-')[GLOBAL_CONSTANTS.zeroth_index];

	const origin_airport_code = origin_airport?.name.split('-')[GLOBAL_CONSTANTS.one];

	const destination_airport_name = destination_airport?.name.split('-')[GLOBAL_CONSTANTS.zeroth_index];

	const destination_airport_code = destination_airport?.name.split('-')[GLOBAL_CONSTANTS.one];

	const [{ loading }, trigger] = useRequest({
		url    : '/delete_saas_air_schedule_subscription',
		method : 'post',
	}, { manual: true });

	const handleDelete = async () => {
		setShowDelete(!showDelete);
	};
	const deleteSchedule = async (scheduleId) => {
		const response = await trigger({
			params: { saas_air_schedule_subscription_id: scheduleId },
		});

		if (response?.status === TWO_HUNDRED) {
			fetchSchedules();
		}
	};

	return {
		deleteSchedule,
		loading,
		showDelete,
		setShowDelete,
		originSchedule,
		DestinationSchedule,
		origin_airport_name,
		origin_airport_code,
		destination_airport_name,
		destination_airport_code,
		handleViewDetails,
		handleDelete,
	};
};

export default useDeleteSchedule;
