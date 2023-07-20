import { Modal, Button } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EBookingStatus({ setShowBookingStatus = () => {}, showBookingStatus = false }) {
	return (
		<Modal
			show={showBookingStatus}
			onClose={() => setShowBookingStatus(false)}
		>
			<div className={styles.container}>
				<div className={styles.heading}><IcCError width={25} height={25} /></div>
				<div className={styles.text}>
					E-Booking was not placed, kindly proceed with
					<br />
					Normal Booking
				</div>
				<div className={styles.button_container}>
					<Button
						onClick={() => setShowBookingStatus(false)}
					>
						Confirm
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default EBookingStatus;
