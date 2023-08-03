import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

function BookingVerification() {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<img
					src={GLOBAL_CONSTANTS.image_url.booking_verification_png}
					alt="poclogo"
					width={44}
					height={44}
				/>

				<div className={styles.content}>
					<div className={styles.sub_heading}>Share link with your customer</div>
					<div className={styles.text}>
						Your customer will have to click the link to
						verify the booking.
					</div>
				</div>
			</div>

			<Button
				type="button"
				size="md"
				disabled
			>
				Share Link
			</Button>
		</div>
	);
}

export default BookingVerification;
