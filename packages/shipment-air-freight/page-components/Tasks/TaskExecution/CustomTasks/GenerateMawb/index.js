import React from 'react';

import styles from './styles.module.css';
import UploadDoc from './UploadDoc';

function GenerateMawb({
	pendingTask,
	summary,
	refetch = () => {},
	clearTask = () => {},
}) {
	return (
		<div className={styles.container}>
			<div>
				<UploadDoc
					task={pendingTask}
					shipment_data={summary}
					refetch={refetch}
					clearTask={clearTask}
				/>

			</div>
		</div>
	);
}

export default GenerateMawb;
