import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function AcceptOfferModal({
	setShowAcceptModal = () => {},
	showAcceptModal = false,
	id = '',
	getEmployeeDetails = () => {},
}) {
	const { updateData } = useUpdateOfferLetter({ id, setShowAcceptModal, getEmployeeDetails });

	if (!showAcceptModal) return null;

	return (
		<Modal size="md" show={showAcceptModal} onClose={() => setShowAcceptModal(false)}>
			<Modal.Header title="Are you sure you want to Accept this Offer Letter?" />
			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowAcceptModal(false)}
						className={styles.btn_container}
					>
						No
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '8px' }}
						onClick={() => updateData({ status: 'accepted' })}
					>
						Yes
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AcceptOfferModal;
