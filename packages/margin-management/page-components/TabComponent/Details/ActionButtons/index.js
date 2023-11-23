import { Button } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ActionButtons({
	handleEdit = () => {},
	activeTab = '',
	setOpenUpdateModal = () => {},
	handleDeactivateModal = () => { },
	setUpdateDiscountSetting = () => { },
	isDefaultMargin = false,
}) {
	return (
		<div className={styles.container}>
			<Button
				themeType="secondary"
				className={styles.btn}
				onClick={() => handleEdit()}
				size="sm"
			>
				Edit Margin
				<IcMEdit
					style={{ width: '1em', height: '1em', marginRight: '2px' }}
				/>
			</Button>

			{!isDefaultMargin ? (
				<Button
					themeType="secondary"
					className={styles.btn}
					onClick={handleDeactivateModal}
					size="sm"
				>
					{activeTab === 'approval_pending' ? 'Reject' : 'Deactivate'}
					<IcMDelete
						style={{ width: '1em', height: '1em', marginRight: '4px' }}
					/>
				</Button>
			) : null}

			{activeTab === 'approval_pending' ? (
				<Button
					className={styles.btn}
					themeType="secondary"
					onClick={() => setOpenUpdateModal(true)}
					size="sm"
				>
					{activeTab === 'approval_pending' ? 'approve' : 'update status'}
				</Button>
			) : null}

			{activeTab === 'cogoport' ? (
				<Button
					className={styles.btn}
					themeType="secondary"
					onClick={() => setUpdateDiscountSetting(true)}
					size="sm"
				>
					Edit discount settings
					<IcMEdit
						style={{ width: '1em', height: '1em', marginRight: '2px' }}
					/>
				</Button>
			) : null}
		</div>
	);
}

export default ActionButtons;
