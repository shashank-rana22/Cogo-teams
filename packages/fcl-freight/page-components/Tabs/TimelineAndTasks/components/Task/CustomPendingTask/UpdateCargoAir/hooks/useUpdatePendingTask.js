import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';

const useUpdatePendingTask = ({
	task,
	onCancel,
	timeLineRefetch,
	refetch,
	services,
	noOfStops1,
}) => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateShipmentService = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_service');

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		scope,
	)('/update_shipment_pending_task');

	const handleUpdate = async (data) => {
		const formatMovementDetails = [];
		data.movement.forEach((stopDetails) => {
			formatMovementDetails.push({
				service_type: services[0]?.service_type || null,
				flight_number: stopDetails?.flight_number_stop || null,
				from_airport_id: stopDetails?.from_airport_id || null,
				to_airport_id: stopDetails?.to_airport_id || null,
				schedule_arrival: stopDetails?.schedule_arrival || null,
				schedule_departure: stopDetails?.schedule_departure || null,
			});
		});
		const payloadForUpdateShipment = {
			data: {
				movement_details: formatMovementDetails,
				flight_number: noOfStops1 > 0 ? null : data?.flight_number,
				number_of_stops: data?.no_of_stops1 || 0,
				cargo_readiness_date: data?.cargo_ready_date,
				schedule_arrival: data?.flight_arrival,
				schedule_departure: data?.flight_departure,
			},
			shipment_id: task?.shipment_id,
			ids: task?.task_field_ids,
			performed_by_org_id: task?.organization_id,
			service_type: task?.service_type,
		};
		try {
			const res = await updateShipmentService.trigger({
				data: payloadForUpdateShipment,
			});

			if (!res?.hasError) {
				const response = await updateShipmentPendingTask.trigger({
					data: {
						id: task.id,
					},
				});
				if (!response.hasError) {
					toast.success('Task Updated Successfully !');
					refetch();
					onCancel();
					timeLineRefetch();
				} else {
					toast.error('Something went wrong !');
				}
			} else {
				toast.error(JSON.stringify(res?.data));
			}
		} catch (err) {
			toast.error(err?.data?.base);
		}
	};

	return {
		handleUpdate,
		loading: updateShipmentPendingTask.loading,
	};
};

export default useUpdatePendingTask;
