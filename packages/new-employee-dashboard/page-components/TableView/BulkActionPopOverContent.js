import { Button, Modal } from '@cogoport/components';
import React from 'react';

import useBulkEmployeeDetails from '../hooks/useBulkEmployeeDetails';

import styles from './styles.module.css';

function BulkActionPopOverContent({
	setShowPopOver = () => {},
	setShowModal = () => {},
	showModal = false,
	selectedIds = [],
}) {
	const { btnloading: bulkloading, sendBulkActionMail } = useBulkEmployeeDetails({
		selectedIds,
		setShowModal,
	});

	return (
		<div className={styles.popover_content}>
			<div className={styles.div_button_content}>
				<Button
					style={{ width: '194px' }}
					themeType="secondary"
					loading={bulkloading}
					onClick={() => {
						sendBulkActionMail('send_quickchex_mail');
						setShowPopOver(false);
					}}
				>
					Send Mail To Quikchex
				</Button>
			</div>

			<div className={styles.div_button2_content}>
				<Button
					style={{ width: '194px' }}
					themeType="secondary"
					loading={bulkloading}
					onClick={() => {
						setShowModal(true);
						setShowPopOver(false);
					}}
				>
					Move Employees to Probation
				</Button>
			</div>

			<Modal size="md" show={showModal} onClose={() => setShowModal(false)} placement="center">
				<Modal.Header title="Move Employees to Probation" />
				<Modal.Body>
					<div>
						<div>
							All the selected Employees will be moved to the
							<b> Employee Directory Navigation </b>
							and will no longer be visible here.
						</div>

						<div className={styles.selection_content}>
							<div className={styles.title}>
								Are you sure you want to change selected Employees status to Probation?
							</div>

							<div className={styles.button_content}>
								<Button onClick={() => setShowModal(false)} themeType="secondary">
									No
								</Button>

								<Button
									style={{ marginLeft: 12 }}
									onClick={() => sendBulkActionMail('move_to_probation')}
								>
									Yes
								</Button>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default BulkActionPopOverContent;
