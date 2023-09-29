import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getControls from './getControls';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function CartingRequest({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch });
	const { errors, control, watch, handleSubmit } = useForm();
	const formValues = watch();
	const controls = getControls({ formValues });
	const onSubmit = () => {
		console.log('formValues: ', formValues);
		// apiTrigger({ payload });
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
