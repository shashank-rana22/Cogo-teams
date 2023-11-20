import { Button, Modal } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Confirmation(
	{
		showConfirm = false,
		setShowConfirm = () => {},
		bulkPostJV = () => {},
		selectedJV = {},
		setSelectedJV = () => {},

	},
) {
	const unqIds = selectedJV.filter((value, index, array) => array.indexOf(value) === index);
	return (
		<Modal
			show={showConfirm}
			placement="top"
			closeOnOuterClick={false}
			onClose={() => {
				setShowConfirm(false);
			}}
		>
			<div className={styles.heading}>
				You have Selected
				{' '}
				{unqIds?.length || 0}
				{' '}
				Payments. Are you sure you want to post?
			</div>
			<div className={styles.buttons}>
				<Button
					themeType="secondary"
					onClick={() => {
						setShowConfirm(false);
					}}
				>
					Cancel
				</Button>
				<Button
					themeType="primary"
					onClick={() => bulkPostJV({ selectedJV, setSelectedJV })}
					className={styles.post}
				>
					Post
				</Button>
			</div>
		</Modal>
	);
}

export default Confirmation;
