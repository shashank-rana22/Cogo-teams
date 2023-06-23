import { useState } from 'react';

import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';

function PreviewBooking({ data }) {
	const [showBreakup, setShowBreakup] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview />
		</div>
	);
}

export default PreviewBooking;
