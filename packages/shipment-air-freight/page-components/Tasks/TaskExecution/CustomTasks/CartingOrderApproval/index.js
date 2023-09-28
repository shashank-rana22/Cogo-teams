import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import DocCard from './DocCard';
import styles from './styles.module.css';

function CartingOrderApproval({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	console.log('onCancel:', onCancel);
	console.log('refetch:', refetch);
	console.log('shipmentData:', shipmentData);
	console.log('task:', task);
	const { control } = useForm();
	const list = [
		{
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
		{
			filename : 'test.png',
			fileurl  : 'sdfas.com',

		},
	];

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Uploaded Documents</div>
			{(list || []).map((item) => <DocCard key={item?.fileurl} item={item} control={control} />)}
			<div className={styles.submit_button}>
				<Button>Submit</Button>
			</div>
		</div>
	);
}

export default CartingOrderApproval;
