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
	const { btnloading:bulkloading, sendBulkActionMail } = 	useBulkEmployeeDetails({
		selectedIds,
		setShowModal,
	});
	return (
		<div className={styles.popover_content}>
			<div className={styles.div_button_content}>
				<Button
					style={{ width: '190px' }}
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
							All the selected Employees in
							{' '}
							<b> New Hire Dashboard</b>
							{' '}
							will be moved to the
							<b> Employee Directory Dasboard</b>
						</div>

						<div className={styles.selection_content}>
							<div className={styles.title}>
								Are you sure you want to move the Employees to Probation?
							</div>

							<div className={styles.button_content}>
								<Button
									style={{ marginLeft: '150px' }}
									themeType="secondary"
									onClick={() => {
										sendBulkActionMail('move_to_probation');
									}}
								>
									{' '}
									Yes
									{' '}

								</Button>

								<Button
									style={{ marginRight: '150px' }}
									onClick={() => setShowModal(false)}
								>
									{' '}
									No
									{' '}

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
