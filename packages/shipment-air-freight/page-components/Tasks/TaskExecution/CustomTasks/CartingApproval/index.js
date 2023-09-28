import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import DocCard from './DocCard';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

function CartingApproval({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	console.log('refetch:', refetch);
	console.log('shipmentData:', shipmentData);
	console.log('task:', task);
	const { control, handleSubmit } = useForm();
	const list = [
		{
			id       : 1,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 2,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 3,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 4,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 5,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 6,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 7,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			id       : 8,
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
	];

	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask();
	console.log('apiTrigger:', apiTrigger);

	const onSubmit = () => {
		console.log('hahahaha');
		// apiTrigger(payload);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Uploaded Documents</div>
			<div className={styles.doc_container}>
				{(list || []).map((item) => <DocCard key={item?.id} item={item} control={control} />)}
			</div>
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

export default CartingApproval;
