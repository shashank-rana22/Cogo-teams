import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

function CartingRequest({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	console.log('onCancel:', onCancel);
	console.log('refetch:', refetch);
	console.log('shipmentData:', shipmentData);
	console.log('task:', task);
	const { errors, control, watch } = useForm();
	const formValues = watch();
	console.log('formValues:', formValues);
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
				<Button>Submit</Button>
			</div>
		</div>
	);
}

export default CartingRequest;
