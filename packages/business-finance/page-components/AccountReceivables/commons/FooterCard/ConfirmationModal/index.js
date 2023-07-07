import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal(
	{
		checkedRows = [],
		bulkIrnGenerate = () => {},
		bulkIrnLoading = false,
		confirmation = false,
		setConfirmation = () => {},
	},
) {
	return (
		<Modal
			show={confirmation}
			placement="top"
			closeOnOuterClick={false}
			onClose={() => {
				setConfirmation(false);
			}}
		>

			<Modal.Header title="Bulk IRN Generate" />
			<div className={styles.heading}>
				You have Selected
				{' '}
				{checkedRows?.length}
				{' '}
				Invoices. Are you sure you want to Generate IRN?
			</div>
			<div className={styles.buttons}>
				<Button
					themeType="secondary"
					onClick={() => {
						setConfirmation(false);
					}}
				>
					Cancel
				</Button>
				<Button
					themeType="primary"
					onClick={() => {
						bulkIrnGenerate(); setConfirmation(false);
					}}
					className={styles.post}
					disabled={bulkIrnLoading}
				>
					IRN Generate
				</Button>
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
