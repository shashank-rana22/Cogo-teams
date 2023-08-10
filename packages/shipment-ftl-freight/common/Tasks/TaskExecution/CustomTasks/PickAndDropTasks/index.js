import { Button } from '@cogoport/components';
import React, { useRef } from 'react';

import useBulkUpdate from './hooks/useBulkUpdate';
import useFinalSubmitHelper from './hooks/useFinalSubmitHelper';
import useUpdatePendingTask from './hooks/useUpdatePendingTask';
import ListTaskDates from './ListTaskDates';
import styles from './styles.module.css';

const DOCUMENT_MAPPING = {
	mark_completed     : 'end_km_image',
	cargo_picked_up_at : 'starting_km_image',
};

function FTLPickAndDropTasks(props) {
	const {
		task = {},
		onCancel = () => {},
		refetch = () => {},
		services = [],
	} = props || {};

	const taskRefData = useRef(null);

	const finalServices = services.filter(
		(item) => item?.service_type !== 'subsidiary_service',
	);

	const doc_type = DOCUMENT_MAPPING[task.task];
	const { loading: bulkLoading, bulkUpdate } = useBulkUpdate();
	const { loading: updateLoading, updatePendingTask } = useUpdatePendingTask({
		task,
		doc_type,
		callback: () => {
			refetch();
			onCancel();
		},
	});

	const { finalSubmit } = useFinalSubmitHelper({
		taskRefData,
		bulkUpdate,
		updatePendingTask,
		task,
	});
	return (
		<div>
			<ListTaskDates
				{...props}
				ref={taskRefData}
				finalServices={finalServices}
			/>
			<div className={styles.button_wrapper}>
				<Button
					className="secondary md"
					disabled={bulkLoading || updateLoading}
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
					onClick={finalSubmit}
					style={{ marginLeft: '10px' }}
					disabled={bulkLoading || updateLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default FTLPickAndDropTasks;
