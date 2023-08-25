import { Button, Modal, cl } from '@cogoport/components';
import React, { useState } from 'react';

import LogsTable from './LogsTable';
import styles from './styles.module.css';

function FlashRevertLogs({ showDetails = false }) {
	const [showLogs, setShowLogs] = useState(false);

	return (
		<>
			<Button
				className={
					cl`${styles.button_container} 
					${showDetails === true ? styles.hide_button : ''}`
				}
				size="md"
				themeType="linkUi"
				onClick={() => setShowLogs(true)}
			>
				Flash Revert Logs
			</Button>

			{showLogs && (
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
			)}
		</>
	);
}

export default FlashRevertLogs;
