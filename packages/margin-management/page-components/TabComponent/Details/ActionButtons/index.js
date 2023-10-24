import { Button } from '@cogoport/components';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ActionButtons({
	handleEdit = () => {},
	// setOpenModal = () => {},
	activeTab = '',
	setOpenUpdateModal = () => {},
	handleDeactivateModal = () => {},
}) {
	return (
		<div className={styles.container}>
			<Button
				style={{ alignItems: 'center', display: 'flex' }}
				onClick={() => handleEdit()}
			>
				<IcMEdit
					style={{ width: '1.5em', height: '1.5em', marginRight: '2px' }}
				/>
				edit
			</Button>

			<Button
				style={{ alignItems: 'center', display: 'flex' }}
				onClick={handleDeactivateModal}
			>
				<IcMDelete
					style={{ width: '1em', height: '1em', marginRight: '4px' }}
				/>
				{activeTab === 'approval_pending' ? 'reject' : 'deactivate'}
			</Button>

			{activeTab === 'approval_pending' ? (
				<Button
					style={{
						alignItems : 'center',
						display    : 'flex',
					}}
					onClick={() => setOpenUpdateModal(true)}
				>
					{activeTab === 'approval_pending' ? 'approve' : 'update status'}
				</Button>
			) : null}
		</div>
	);
}

export default ActionButtons;
