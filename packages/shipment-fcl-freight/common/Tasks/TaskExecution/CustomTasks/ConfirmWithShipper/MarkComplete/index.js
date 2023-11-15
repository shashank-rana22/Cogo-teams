import { Button } from '@cogoport/components';

import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

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
		<div>
			<Button onClick={onClick} disabled={loading}>Mark Complete</Button>
		</div>
	);
}

export default MarkComplete;
