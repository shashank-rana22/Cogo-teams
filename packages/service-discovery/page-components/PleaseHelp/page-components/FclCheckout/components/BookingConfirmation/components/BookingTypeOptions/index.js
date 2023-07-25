import { RadioGroup } from '@cogoport/components';

import BookingProof from './BookingProof';
import styles from './styles.module.css';

function BookingTypeOptions({
	radioOption = [],
	bookingConfirmationMode = '',
	setBookingConfirmationMode = () => {},
	detail = {},
	updateCheckout = () => {},
	updateLoading = false,
}) {
	return (
		<div className={styles.container}>
			{radioOption.length > 1 ? (
				<div className={styles.radio_wrapper}>
					<div className={styles.title}>Booking Confirmation Through</div>

					<RadioGroup
						options={radioOption}
						value={bookingConfirmationMode || ''}
						onChange={(item) => setBookingConfirmationMode(item)}
					/>
				</div>
			) : null}

			{bookingConfirmationMode === 'booking_proof' ? (
				<BookingProof
					detail={detail}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>
			) : null}
		</div>
	);
}

export default BookingTypeOptions;
