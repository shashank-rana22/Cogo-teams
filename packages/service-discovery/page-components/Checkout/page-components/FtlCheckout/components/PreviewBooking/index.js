import { useContext, useState } from 'react';

import { CheckoutContext } from '../../../../context';

import AdditionalContent from './components/AdditionalContent';
import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';

function PreviewBooking() {
	const {	rate = {} } = useContext(CheckoutContext);

	const [showBreakup, setShowBreakup] = useState(false);
	const [agreeTandC, setAgreeTandC] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview
				rate={rate}
				setShowBreakup={setShowBreakup}
				showBreakup={showBreakup}
			/>

			<AdditionalContent
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
			/>
		</div>
	);
}

export default PreviewBooking;
