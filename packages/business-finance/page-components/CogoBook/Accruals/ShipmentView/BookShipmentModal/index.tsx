import { Modal, Button, Loader } from '@cogoport/components';
import React from 'react';

import useBookShipmentCount from '../../../hooks/getBookShipmentCount';

import styles from './style.module.css';

function BookShipmentModal({ showBookShipment = false, setShowBookShipment, filters = {} }) {
	const {
		data, loading, bookShipmentConfirmData,
		bookShipmentConfirmLoading,
	} =	 useBookShipmentCount({ filters, setShowBookShipment });
	const onClose = () => {
		setShowBookShipment(false);
	};
	return (
		<div>
			<Modal size="md" show={showBookShipment} onClose={onClose} placement="top">
				<Modal.Body>
					{loading ? (
						<Loader themeType="primary" style={{ margin: '54px 0px 38px 46%' }} />
					) : (
						<div style={{ margin: '54px 0px 38px 21%' }}>
							<div className={styles.text1}>
								There are
								{' '}
								<span style={{ color: '#EE3425' }}>
									{data}
									{' '}
									Shipments
								</span>
								{' '}
								that can be booked.
							</div>
							<div className={styles.text2}>
								Are you sure you want to book shipments?
							</div>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button size="md" themeType="secondary" onClick={onClose}>Cancel</Button>
					<Button
						onClick={bookShipmentConfirmData}
						disabled={bookShipmentConfirmLoading}
						style={{ marginLeft: '10px' }}
					>
						Confirm

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default BookShipmentModal;
