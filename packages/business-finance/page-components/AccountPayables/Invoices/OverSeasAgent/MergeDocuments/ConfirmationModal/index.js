import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal({
	showConfirmationModal = false,
	setShowConfirmationModal = () => {},
	handelMergeInvoices = () => {},
	data = {},
	setAllowed = () => {},
}) {
	return (
		<Modal
			show={showConfirmationModal}
			onClose={() => setShowConfirmationModal(false)}
			showCloseIcon
		>
			<Modal.Header title={(
				<div className={styles.header_text}>
					Merge Documents
				</div>
			)}
			/>

			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.icon}>
						<IcCError width={28} height={28} />
					</div>
					<div className={styles.icon}>
						Are you sure you want to merge
						{' '}
						{data?.totalRecords}
						{' '}
						Invoices?
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.btn_container}>
					<Button
						themeType="secondary"
						onClick={() => setShowConfirmationModal(false)}
						className={styles.btn}
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							handelMergeInvoices();
							setAllowed(false);
						}}
						className={styles.btn}
					>
						Yes
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ConfirmationModal;
