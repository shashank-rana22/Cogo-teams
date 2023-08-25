import { useContext } from 'react';

import { CheckoutContext } from '../../../../context';

import AdditionalContent from './components/AdditionalContent';
import BookingPreview from './components/BookingPreview';
import styles from './styles.module.css';
import useHandlePreviewBooking from './useHandlePreviewBooking';

function PreviewBooking() {
	const {
		primaryService,
		rate,
	} = useContext(CheckoutContext);

	const {
		setInfoBanner = () => {},
		infoBanner = {},
		setShowBreakup = () => {},
		showBreakup = false,
		agreeTandC = false,
		setAgreeTandC = () => {},
	} = useHandlePreviewBooking({ primaryService });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Preview Booking</div>

			<BookingPreview
				rate={rate}
				setShowBreakup={setShowBreakup}
				showBreakup={showBreakup}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>

			<AdditionalContent
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>
		</div>
	);
}

export default PreviewBooking;
