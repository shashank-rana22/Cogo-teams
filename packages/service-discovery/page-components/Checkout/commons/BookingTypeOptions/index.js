import { RadioGroup } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../context';
import PocDetails from '../ShareQuotation/PocDetails';

import BookingProof from './BookingProof';
import styles from './styles.module.css';

const ONE = 1;

function BookingTypeOptions({
	radioOption = [],
	bookingConfirmationMode = '',
	setBookingConfirmationMode = () => {},
	isAssistedBookingNotAllowed = false,
}) {
	const {
		detail = {},
		updateCheckout = () => {},
		updateLoading = false,
	} = useContext(CheckoutContext);

	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);

	if (isAssistedBookingNotAllowed) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div>
				{radioOption.length > ONE ? (
					<div className={styles.radio_wrapper}>
						<div className={styles.title}>Booking Confirmation Through</div>

						<RadioGroup
							options={radioOption}
							value={bookingConfirmationMode || ''}
							onChange={(item) => setBookingConfirmationMode(item)}
						/>
					</div>
				) : (
					<div className={styles.radio_wrapper}>
						<div className={styles.title}>Booking Confirmation Through</div>

						<div className={styles.type}>{startCase(bookingConfirmationMode)}</div>
					</div>
				)}

				{bookingConfirmationMode === 'booking_proof' ? (
					<BookingProof
						detail={detail}
						updateCheckout={updateCheckout}
						updateLoading={updateLoading}
						length={radioOption.length}
					/>
				) : null}
			</div>

			{bookingConfirmationMode === 'whatsapp' ? (
				<PocDetails
					showWhatsappVerificationModal={showWhatsappVerificationModal}
					setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
					bookingConfirmationMode={bookingConfirmationMode}
					detail={detail}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>
			) : null}
		</div>
	);
}

export default BookingTypeOptions;
