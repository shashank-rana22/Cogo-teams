import { Button, Modal } from '@cogoport/components';
import React, { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.css';

interface Props {
	bulkPost: () => void,
	showConfirm: boolean;
	setShowConfirm: Dispatch<SetStateAction<string | boolean>>;
	checkedRows: string[];
	loading: boolean;
}

function Confirmation(
	{
		showConfirm,
		setShowConfirm,
		bulkPost = () => {
		},
		checkedRows = [],
		loading,
	}: Props,
) {
	const unqIds = checkedRows.filter((value, index, array) => array.indexOf(value) === index);
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
					onClick={bulkPost}
					className={styles.post}
					loading={loading}
				>
					Post
				</Button>
			</div>
		</Modal>
	);
}

export default Confirmation;
