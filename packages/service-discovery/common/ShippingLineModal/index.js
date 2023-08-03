import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFcrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CogoAssured() {
	return (
		<img
			src={GLOBAL_CONSTANTS.image_url.cogo_assured_banner}
			alt="COGO ASSURED"
			height={22}
			className={styles.cogo_assured_banner}
		/>
	);
}

function ShippingLineModal({ shipping_line = {}, show = false, setShow = () => {} }) {
	const onClose = () => setShow(false);

	const { short_name } = shipping_line;

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			closeOnOuterClick={false}
			showCloseIcon={false}
			placement="top-right"
			className={styles.modal}
		>
			<Modal.Body className={styles.modal_body}>
				<div className={styles.container}>
					<IcCFcrossInCircle
						className={styles.cross_icon}
						height={24}
						width={24}
						onClick={onClose}
					/>

					<div className={styles.wrapper}>
						Looks like you have selected
						<span className={styles.shipping_line_name}>{short_name}</span>
						. In the past we have seen around
						<strong> 40% </strong>
						cancellations in this route for non
						<CogoAssured />
						bookings. Why not try
						<CogoAssured />
						for
						<strong> 100% </strong>
						booking confirmation?
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ShippingLineModal;
