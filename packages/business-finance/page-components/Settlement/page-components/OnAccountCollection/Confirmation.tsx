import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { Dispatch, SetStateAction } from 'react';

import styles from './styles.module.css';

interface Props {
	bulkPost: () => void,
	showConfirm: boolean;
	setShowConfirm: Dispatch<SetStateAction<string | boolean>>;
	checkedRows: object;
	loading: boolean;
	getIds: (rowsChecked: object) => string[],
}

function Confirmation(
	{
		showConfirm,
		setShowConfirm,
		bulkPost = () => {
		},
		checkedRows = [],
		loading,
		getIds = (val) => [],
	}: Props,
) {
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
				{getIds(checkedRows)?.length || 0}
				{' '}
				Payments. Are You Sure you want to Post?
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
