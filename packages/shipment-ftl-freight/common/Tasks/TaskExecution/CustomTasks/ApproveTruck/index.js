import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import useGetService from '../../../../../hooks/useGetService';
import useUpdateBookingParameter from '../../../../../hooks/useUpdateBookingParameter';
import useUpdateFtlAdditionalService from '../../../../../hooks/useUpdateFtlAdditionalService';
import useUpdateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import { addTruckConfigs } from './configs/addTruckConfigs';
import styles from './styles.module.css';

function ApproveTruck({
	onCancel = () => {},
	task = {},
	taskListRefetch = () => {},
}) {
	const { loading, updateService } = useUpdateFtlAdditionalService({});
	const { loading: serviceLoading, data } = useGetService({ defaultParams: { id: task.task_field_id } });

	const { loading:shipmentLoading, updateBookingParameter } = useUpdateBookingParameter({});
	const { loading: taskLoading, apiTrigger } = useUpdateTask({});

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

	const updateData = async (is_approved = false) => {
		if (task?.task === 'approve_updated_truck' && is_approved) {
			const val = {
				shipment_id : data?.shipment_id,
				services    : [
					{
						service_type   : 'ftl_freight_service',
						service_id     : task?.service_id,
						booking_params : obj,
					},
				],
			};
			await updateBookingParameter(val);
		}

		taskListRefetch();
		onCancel();
	};

	const approveTruck = async (is_approved = false) => {
		const val = {
			service_id      : task?.service_id,
			pending_task_id : task?.id,
			is_approved,
		};
		updateService(val);
		Toast.success('Task completed successfully');
		await updateData();
	};

	const updateTruck = async (is_approved = false) => {
		const val = {
			id: task?.id,
		};
		apiTrigger(val);
		if (!is_approved) Toast.success('Task completed successfully');
		await updateData();
	};
	const disabled = task?.task === 'approve_additional_truck'
		? loading || serviceLoading
		: shipmentLoading || taskLoading;

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
					onClick={() => onCancel()}
					disabled={disabled}
				>
					Cancel
				</Button>
				<Button
					onClick={() => (task?.task === 'approve_additional_truck'
						? approveTruck(false)
						: updateTruck(false))}
					disabled={disabled}
				>
					Reject
				</Button>
				<Button
					onClick={() => (task?.task === 'approve_additional_truck'
						? approveTruck(true)
						: updateTruck(true))}
					disabled={disabled}
				>
					Accept
				</Button>
			</div>
		</div>
	);
}

export default ApproveTruck;
