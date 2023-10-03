import { Layout } from '@cogoport/air-modules';
import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import controls from './controls';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function CartingRequest({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { errors = {}, control = {}, handleSubmit = () => {} } = useForm();

	const routeBack = () => {
		refetch();
		onCancel();
	};

	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ routeBack });

	const onSubmit = (values) => {
		const { vehicle_arrival_date = '' } = values || {};
		const { startDate = '', endDate = '' } = vehicle_arrival_date || {};

		if ((endDate.getDate() === startDate.getDate() && endDate.getTime() <= startDate.getTime())
		|| (endDate.getDate() < startDate.getDate())) {
			Toast.error('Start dateTime value cannot exceed End dateTime value');
			return;
		}

		const airFreightServiceId = (shipmentData?.all_services || []).filter(
			(item) => item?.display_service_type === 'air_freight_service',
		);

		const payload = {
			id   : task?.id,
			data : {
				air_freight_service: {
					id                    : [airFreightServiceId?.[GLOBAL_CONSTANTS.zeroth_index]?.id || ''],
					carting_order_details : values,
				},
			},
		};
		apiTrigger({ payload });
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Add Vehicle Arrivals Slots</div>
			<Layout
				fields={controls?.dateControls}
				control={control}
				errors={errors}
			/>
			<div className={styles.heading}>Add Vehicle Number</div>
			<div className={styles.layout_container}>
				<Layout
					fields={controls?.vehicleControls}
					control={control}
					errors={errors}
				/>
			</div>
			<div className={styles.submit_button}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className={styles.submit}
					onClick={handleSubmit(onSubmit)}
					disabled={loading || task?.status === 'completed'}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default CartingRequest;
