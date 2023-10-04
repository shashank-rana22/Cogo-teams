import { Button, Modal } from '@cogoport/components';
import React, { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.css';

interface Props {
	bulkPostToSageAction: (array: number[]) => void,
	confirmation: boolean;
	setConfirmation: Dispatch<SetStateAction<string | boolean>>;
	notSettledIds: number[];
	loading: boolean;
}

function ConfirmationModal(
	{
		notSettledIds,
		bulkPostToSageAction,
		confirmation,
		setConfirmation,
		loading,
	}: Props,
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

			<Modal.Header title="Bulk post to Sage" />
			<div className={styles.heading}>
				You have Selected
				{' '}
				{notSettledIds?.length || 0}
				{' '}
				Settlements. Are you sure you want to post?
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
						bulkPostToSageAction(notSettledIds); setConfirmation(false);
					}}
					className={styles.post}
					loading={loading}
				>
					Post
				</Button>
			</div>
		</Modal>
	);
}

export default ConfirmationModal;
