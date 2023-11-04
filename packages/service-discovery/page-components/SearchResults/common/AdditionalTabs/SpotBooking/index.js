import { Button, cl } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import styles from './styles.module.css';

const SPOT_BOOKING_SERVICES = ['fcl_freight'];

function SpotBooking({ detail = {}, setScreen = () => {} }) {
	const { service_type = '', spot_line_config = {} } = detail;

	const { is_spot_line_booking_available = false	} = spot_line_config || {};

	if (!SPOT_BOOKING_SERVICES.includes(service_type) || !is_spot_line_booking_available) {
		return null;
	}

	return (
		<div className={cl`${styles.container}`}>
			<div className={styles.left_section}>
				<p className={styles.label}>Spot Line Booking</p>

				<p className={styles.text}>
					Select Liner and add Custom Rates to make a Spot Line Booking.
					The booking will be accepted only if Spots are open for that Liner
				</p>
			</div>

			<div className={styles.right_section}>
				<Button
					type="button"
					size="md"
					themeType="secondary"
					onClick={() => setScreen('spot_booking')}
				>
					<span className={styles.button_text}>Make Spot Line Booking</span>
					<IcMArrowRight fontSize={15} />
				</Button>
			</div>
		</div>
	);
}

export default SpotBooking;
