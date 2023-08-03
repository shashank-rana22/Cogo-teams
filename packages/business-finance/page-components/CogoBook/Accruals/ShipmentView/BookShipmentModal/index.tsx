import { Modal, Button } from '@cogoport/components';
import React from 'react';

import styles from './style.module.css';

function BookShipmentModal({ showBookShipment, setShowBookShipment }) {
	const onClose = () => {
		setShowBookShipment(false);
	};
	return (
		<div>
			<Modal size="md" show={showBookShipment} onClose={onClose} placement="top" showCloseIcon>
				{/* <Modal.Header /> */}
				<Modal.Body>
					<div style={{ margin: '54px 0px 38px 21%' }}>
						<div className={styles.text1}>
							There are
							{' '}
							<span>15 Shipments</span>
							{' '}
							that can be booked.
						</div>
						<div className={styles.text2}>
							Are you sure you want to book shipments?
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button size="md" themeType="secondary" onClick={onClose}>Reject</Button>
					<Button onClick={onClose} style={{ marginLeft: '10px' }}>Confirm</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default BookShipmentModal;
