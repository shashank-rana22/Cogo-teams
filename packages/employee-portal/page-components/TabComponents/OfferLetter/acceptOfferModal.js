import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useUpdateOfferLetter from './useUpdateOfferLetter';

function AcceptOfferModal({ setShowAcceptModal, showAcceptModal, id }) {
	const { updateData } = useUpdateOfferLetter({ id });
	return (
		<Modal size="md" show={showAcceptModal} onClose={setShowAcceptModal(false)}>
			<Modal.Header title="Are you sure you want to Accept this Offer Letter?" />
			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						style={{ marginLeft: '8px' }}
						onClick={() => {
							updateData({ status: 'accept' });
							setShowAcceptModal(false);
						}}
					>
						Yes
					</Button>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowAcceptModal(false)}
						className={styles.btn_container}
					>
						No
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default AcceptOfferModal;
