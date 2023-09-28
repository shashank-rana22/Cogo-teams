import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function CartingDetails({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	console.log('shipmentData:', shipmentData);
	const { control = {}, errors = {}, handleSubmit = () => {} } = useForm();
	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask();
	const onSubmit = () => {
		console.log('hahahahahaha');
	};
	return (
		<div className={styles.main_container}>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.submit_button}>
				<Button themeType="secondary" onClick={onCancel} disabled={loading}>
					Cancel
				</Button>
				<Button className={styles.submit} onClick={handleSubmit(onSubmit)} disabled={loading}>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default CartingDetails;
