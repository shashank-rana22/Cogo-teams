import { useForm } from '@cogoport/forms';
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

	const formProps = useForm();

	const {
		setInfoBanner = () => {},
		infoBanner = {},
		setShowBreakup = () => {},
		showBreakup = false,
		cargoDetails = {},
		setCargoDetails = () => {},
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
				cargoDetails={cargoDetails}
				setCargoDetails={setCargoDetails}
				agreeTandC={agreeTandC}
				setAgreeTandC={setAgreeTandC}
				formProps={formProps}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>
		</div>
	);
}

export default PreviewBooking;
