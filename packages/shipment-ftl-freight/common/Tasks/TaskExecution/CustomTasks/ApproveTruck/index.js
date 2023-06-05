import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import useGetService from '../../../../../hooks/useGetService';
import useUpdateBookingParameter from '../../../../../hooks/useUpdateBookingParameter';
import useUpdateFtlAdditionalService from '../../../../../hooks/useUpdateFtlAdditionalService';
import useUpdateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import { addTruckConfigs } from './configs/addTruckConfigs';
// import useGetShipmentService from './hooks/useGetShipmentService';
// import useUpdateAdditionalService from './hooks/useUpdateAdditionalService';
// import useUpdateShipmentBookingParameter from './hooks/useUpdateShipmentBookingParameter';
// import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function ApproveTruck({
	onCancel = () => {},
	task = {},
	taskListRefetch = () => {},
}) {
	// const { loading, updateService } = useUpdateAdditionalService();
	// const {
	// 	loading: serviceLoading,
	// 	getShipmentService,
	// 	data,
	// } = useGetShipmentService();
	const { loading: serviceLoading, data } = useGetService({ defaultParams: { id: task.task_field_id } });

	const { updateBookingParameter } = useUpdateBookingParameter();
	// const { loading: shipmentLoading, updateShipmentBookingParameter } =		useUpdateShipmentBookingParameter();
	// const { loading: taskLoading, updateShipmentPendingTask } =		useUpdateShipmentPendingTask();

	const truckConfigs = addTruckConfigs();
	truckConfigs[0].controls[6].rules =		task?.task !== 'approve_additional_truck'
		? { required: 'Weight is required' }
		: '';

	const defaultValues = getDefaultValues(truckConfigs);

	const {
		control,
		formState: { errors },
		setValue,
	} = useForm(defaultValues);

	let obj;
	if (data) {
		obj = {
			truck_type     : data?.truck_type,
			truck_number   : data?.truck_number,
			driver_details : {
				name    : data?.driver_details?.name,
				contact : data?.driver_details?.contact,
			},
			estimated_arrival   : data?.estimated_arrival,
			estimated_departure : data?.estimated_departure,
			weight              : data?.weight,
		};
	}

	const refetch = async (is_approved = false) => {
		// if (task?.task === 'approve_updated_truck' && is_approved) {
		// 	await updateShipmentBookingParameter(
		// 		data?.shipment_id,
		// 		task?.service_id,
		// 		obj,
		// 	);
		// }

		taskListRefetch();
		onCancel();
	};

	// const approveTruck = (is_approved = false) => {
	// 	updateService({
	// 		service_id      : task?.service_id,
	// 		pending_task_id : task?.id,
	// 		is_approved,
	// 		callback,
	// 	});
	// };

	// const updateTruck = (is_approved = false) => {
	// 	updateShipmentPendingTask(task?.id, is_approved, callback);
	// };
	// const disabled =		task?.task === 'approve_additional_truck'
	// 	? loading || serviceLoading
	// 	: shipmentLoading || taskLoading;

	// useEffect(() => {
	// 	getShipmentService(task?.task_field_id);
	// }, []);

	useEffect(() => {
		if (data) {
			const finalTrucks = [
				{
					truck_type          : data?.truck_type,
					truck_number        : data?.truck_number,
					driver_name         : data?.driver_details?.name,
					contact_number      : data?.driver_details?.contact,
					estimated_arrival   : data?.estimated_arrival,
					estimated_departure : data?.estimated_departure,
					weight              : data?.weight,
				},
			];

			setValue('truck_config', finalTrucks);
		}
	}, [data, setValue]);
	return (
		<div className={styles.container}>
			<Layout
				control={control}
				fields={truckConfigs}
				errors={errors}
				themeType="admin"
			/>
			<div className={styles.button_content}>
				<Button
					className="secondary md"
					onClick={() => onCancel()}
					// disabled={disabled}
				>
					Cancel
				</Button>
				<Button
					className="secondary md"
					// onClick={() => (task?.task === 'approve_additional_truck'
					// 	? approveTruck(false)
					// 	: updateTruck(false))}
					// disabled={disabled}
				>
					Reject
				</Button>
				<Button
					className="primary md"
					// onClick={() => (task?.task === 'approve_additional_truck'
					// 	? approveTruck(true)
					// 	: updateTruck(true))}
					// disabled={disabled}
				>
					Accept
				</Button>
			</div>
		</div>
	);
}

export default ApproveTruck;
