import { Button } from '@cogoport/components';

import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import styles from './styles.module.css';

function MarkComplete({ task = {}, refetch = () => {}, onCancel = () => {} }) {
	const taskRefetch = () => {
		refetch();
		onCancel();
	};
	const { apiTrigger, loading } = useUpdateShipmentPendingTask({ refetch: taskRefetch });

	const onClick = () => {
		apiTrigger({	id: task?.id });
	};

	return (
		<div className={styles.button}>
			<Button on onClick={onCancel} themeType="secondary">Cancel</Button>
			<Button onClick={onClick} disabled={loading}>Mark Complete</Button>
		</div>
	);
}

export default MarkComplete;
