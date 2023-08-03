import { RadioGroup, Button } from '@cogoport/components';
import { useState, useContext } from 'react';

import PocDetails from '../../../../../../commons/ShareQuotation/PocDetails';
import QuotationModal from '../../../../../../commons/ShareQuotation/QuotationModal';
import { CheckoutContext } from '../../../../../../context';

import BookingProof from './BookingProof';
import styles from './styles.module.css';

const ONE = 1;

function BookingTypeOptions({
	radioOption = [],
	bookingConfirmationMode = '',
	setBookingConfirmationMode = () => {},
}) {
	const {
		detail = {},
		rate = {},
		updateCheckout = () => {},
		updateLoading = false,
		invoice = {},
		orgData = {},
		isChannelPartner = false,
	} = useContext(CheckoutContext);

	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);
	const [showWhatsappVerificationModal, setShowWhatsappVerificationModal] = useState(false);

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
				) : null}

				{bookingConfirmationMode === 'booking_proof' ? (
					<BookingProof
						detail={detail}
						updateCheckout={updateCheckout}
						updateLoading={updateLoading}
						length={radioOption.length}
					/>
				) : null}
			</div>

			{showShareQuotationModal ? (
				<QuotationModal
					modalSize="xl"
					selectedModes={['email']}
					setShowShareQuotationModal={setShowShareQuotationModal}
					showShareQuotationModal={showShareQuotationModal}
					invoice={invoice}
					rate={rate}
					detail={detail}
					organization={orgData}
					widths={{ email: '100%', message: '0%' }}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>
			) : null}

			{bookingConfirmationMode === 'whatsapp' ? (
				<PocDetails
					showWhatsappVerificationModal={showWhatsappVerificationModal}
					setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
					bookingConfirmationMode={bookingConfirmationMode}
					detail={detail}
					isChannelPartner={isChannelPartner}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>
			) : null}

			{bookingConfirmationMode === 'email' ? (
				<Button
					type="button"
					size="lg"
					themeType="accent"
					onClick={() => setShowShareQuotationModal(true)}
				>
					Share Quotation
				</Button>
			) : null}
		</div>
	);
}

export default BookingTypeOptions;
