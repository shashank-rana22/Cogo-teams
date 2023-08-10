import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const DEFAULT_NUMBER_OF_STOP = 0;
const useUpdateShipmentService = ({
	task,
	onCancel,
	timeLineRefetch,
	refetch,
	services,
}) => {
	const [{ loading:pendingTaskLoading }, updatePendingTaskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});
	const [{ loading:updateServiceLoading }, updateServiceTrigger] = useRequest({
		url    : '/update_shipment_service',
		method : 'POST',
	});

	const handleUpdate = async (data) => {
		const FORMATE_MOVEMENT_DETAILS = [];
		data.movement.forEach((stopDetails) => {
			FORMATE_MOVEMENT_DETAILS.push({
				service_type       : services[GLOBAL_CONSTANTS.zeroth_index]?.service_type || null,
				flight_number      : stopDetails?.flight_number_stop || null,
				from_airport_id    : stopDetails?.from_airport_id || null,
				to_airport_id      : stopDetails?.to_airport_id || null,
				schedule_arrival   : stopDetails?.schedule_arrival || null,
				schedule_departure : stopDetails?.schedule_departure || null,
			});
		});
		let formatData = {};
		formatData = {
			flight_number        : data?.flight_number || null,
			number_of_stops      : data?.no_of_stops || DEFAULT_NUMBER_OF_STOP,
			contact_with_agent   : data?.contact_with_agent,
			cargo_readiness_date : data?.cargo_ready_date,
			schedule_arrival     : data?.flight_arrival,
			schedule_departure   : data?.flight_departure,
			movement_details     : FORMATE_MOVEMENT_DETAILS,
		};

		try {
			const res = await updateServiceTrigger({
				data: {
					data                : formatData,
					shipment_id         : task?.shipment_id,
					ids                 : task?.task_field_ids,
					performed_by_org_id : task?.organization_id,
					service_type        : task?.service_type,
				},
			});

			if (!res?.hasError) {
				const response = await updatePendingTaskTrigger({
					data: {
						id: task.id,
					},
				});
				if (!response.hasError) {
					Toast.success('Task Updated Successfully');
					refetch();
					onCancel();
					timeLineRefetch();
				} else {
					Toast.error('Something went wrong !');
				}
			} else {
				Toast.error(JSON.stringify(res?.data));
			}
		} catch (err) {
			Toast.error(toastApiError(err) || 'something went wrong!');
		}
	};

	return {
		handleUpdate,
		loading: pendingTaskLoading || updateServiceLoading,
	};
};

export default useUpdateShipmentService;
