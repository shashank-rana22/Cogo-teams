import { Button, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import LogsTable from './LogsTable';
import styles from './styles.module.css';

function FlashRevertLogs() {
	const [showLogs, setShowLogs] = useState(false);

	return (
		<>
			<Button
				size="md"
				themeType="linkUi"
				onClick={() => setShowLogs(true)}
			>
				Flash Revert Logs
			</Button>

			<Modal
				show={showLogs}
				size="xl"
				onClose={() => setShowLogs(false)}
				onOuterClick={() => setShowLogs(false)}
				placement="top"
				className={styles.modal_container}
			>
				<Modal.Header title="Flash Revert Logs" />
				<Modal.Body>
					<LogsTable />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default FlashRevertLogs;
