import { Modal, Button, Loader } from '@cogoport/components';
import React from 'react';

import useBookShipmentCount from '../../../hooks/getBookShipmentCount';

import styles from './style.module.css';

const ZERO = 0;

function BookShipmentModal({ showBookShipment = false, setShowBookShipment = () => {}, filters = {} }) {
	const {
		data, loading, bookShipmentConfirmData,
		bookShipmentConfirmLoading,
		bookShipmentValue,
	} =	 useBookShipmentCount({ filters, setShowBookShipment });
	return (
		<Modal size="md" show={showBookShipment} onClose={() => setShowBookShipment(false)} placement="top">
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
				<Button size="md" themeType="secondary" onClick={() => setShowBookShipment(false)}>Cancel</Button>
				<Button
					onClick={bookShipmentConfirmData}
					disabled={bookShipmentConfirmLoading || (bookShipmentValue === ZERO)}
					style={{ marginLeft: '10px' }}
				>
					Confirm

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default BookShipmentModal;
