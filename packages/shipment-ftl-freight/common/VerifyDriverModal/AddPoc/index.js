import { Modal } from '@cogoport/components';
import React from 'react';

import Form from './Form';
import styles from './styles.module.css';

function OnBoardUser({
	fetch = () => {},
	organization_id = '',
	showInternal = '',
	setShowInternalInternal = () => {},
}) {
	return (
		<Modal
			size="lg"
			show={showInternal}
			onClose={() => setShowInternalInternal(false)}
			className={styles.custom_modal}
			closeOnOuterClick={false}
			showInternalCloseIcon
		>
			<Modal.Header title={(
				<div className={styles.heading}>
					Create Driver Poc *
				</div>
			)}
			/>
			<Modal.Body>
				<Form
					fetch={fetch}
					organization_id={organization_id}
					showInternal={showInternal}
					setShowInternalInternal={setShowInternalInternal}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default OnBoardUser;
