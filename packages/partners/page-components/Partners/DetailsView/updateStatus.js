import { Button } from '@cogoport/components';

import useUpdateStatus from '../../../hooks/useUpdateStatus';

import styles from './styles.module.css';

function UpdateStatus({ clickedItem = {}, setView = () => {}, refetch = () => {} }) {
	const { updateStatus } = useUpdateStatus();
	const onUpdateStatus = async () => {
		const payload = { id: clickedItem.id, status: clickedItem.status === 'active' ? 'inactive' : 'active' };
		await updateStatus(payload);
		setView('empty');
		refetch();
	};
	return (
		<div>
			<div className={styles.text}>
				Are you sure, you want to
				{' '}
				{clickedItem.status === 'active' ? 'Deactivate' : 'Activate'}
				{' '}
				the selected partner?
			</div>
			<div className={styles.btn_container}>
				<Button
					onClick={() => { setView('details'); }}
					className={styles.left_btn}
				>
					Cancel

				</Button>
				<Button onClick={() => onUpdateStatus()}>
					{clickedItem.status === 'active' ? 'Deactivate' : 'Activate'}

				</Button>
			</div>
		</div>
	);
}
export default UpdateStatus;
