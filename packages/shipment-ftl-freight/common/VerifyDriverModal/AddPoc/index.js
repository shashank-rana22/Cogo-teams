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
			<Modal.Body>
				<Modal.Header title={(
					<div className={styles.heading}>
						Truck List
					</div>
				)}
				/>

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
