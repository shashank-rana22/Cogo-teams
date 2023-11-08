import BookingDetails from './BookingDetails';
import styles from './styles.module.css';

function BookingPreview({ source: checkoutSource = '' }) {
	if (checkoutSource !== 'spot_line_booking') {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.main_heading}>Add or Edit Margin</div>
			<div className={styles.heading}>Booking Details</div>

			<BookingDetails />
		</div>
	);
}

export default BookingPreview;
