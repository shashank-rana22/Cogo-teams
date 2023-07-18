import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';

const ZERO_STOPS = 0;

const useUpdatePendingTask = ({
	task,
	onCancel,
	timeLineRefetch,
	refetch,
	services,
	noOfStops1,
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
		const FORMAT_MOVEMENT_DETAILS = [];
		data.movement.forEach((stopDetails) => {
			FORMAT_MOVEMENT_DETAILS.push({
				service_type       : services[GLOBAL_CONSTANTS.zeroth_index]?.service_type || null,
				flight_number      : stopDetails?.flight_number_stop || null,
				from_airport_id    : stopDetails?.from_airport_id || null,
				to_airport_id      : stopDetails?.to_airport_id || null,
				schedule_arrival   : new Date(stopDetails?.schedule_arrival) || null,
				schedule_departure : new Date(stopDetails?.schedule_departure) || null,
			});
		});
		const payloadForUpdateShipment = {
			data: {
				movement_details     : FORMAT_MOVEMENT_DETAILS,
				flight_number        : noOfStops1 > ZERO_STOPS ? null : data?.flight_number,
				number_of_stops      : data?.no_of_stops1 || ZERO_STOPS,
				cargo_readiness_date : data?.cargo_ready_date,
				schedule_arrival     : data?.flight_arrival,
				schedule_departure   : data?.flight_departure,
			},
			shipment_id         : task?.shipment_id,
			ids                 : task?.task_field_ids,
			performed_by_org_id : task?.organization_id,
			service_type        : task?.service_type,
		};
		try {
			const res = await updateServiceTrigger({
				data: payloadForUpdateShipment,
			});

			if (!res?.hasError) {
				const response = await updatePendingTaskTrigger({
					data: {
						id: task.id,
					},
				});
				if (!response.hasError) {
					Toast.success('Task Updated Successfully !');
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
			Toast.error(err?.data?.base);
		}
	};

	return {
		handleUpdate,
		loading: pendingTaskLoading || updateServiceLoading,
	};
};

export default useUpdatePendingTask;
