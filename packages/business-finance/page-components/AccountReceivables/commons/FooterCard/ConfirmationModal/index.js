import { Button, Modal } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import React from 'react';

import styles from './styles.module.css';

function ConfirmationModal(
	{
		entityCode,
		checkedRows = [],
		bulkIrnGenerate = () => {},
		bulkIrnLoading = false,
		confirmation = false,
		setConfirmation = () => {},
	},
) {
	const { irn_label:irnLabel } = ENTITY_FEATURE_MAPPING[entityCode].labels;
	return (
		<Modal
			show={confirmation}
			placement="top"
			closeOnOuterClick={false}
			onClose={() => {
				setConfirmation((prev) => !prev);
			}}
		>

			<Modal.Header title={`Bulk ${irnLabel} Generate`} />
			<div className={styles.heading}>
				You have Selected
				{' '}
				{checkedRows?.length}
				{' '}
				Invoices. Are you sure you want to Generate
				{' '}
				{irnLabel}
				?
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
					{irnLabel}
					{' '}
					Generate
				</Button>
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
