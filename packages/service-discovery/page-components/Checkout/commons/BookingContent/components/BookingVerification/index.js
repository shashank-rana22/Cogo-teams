import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useContext } from 'react';

import { CheckoutContext } from '../../../../context';
import QuotationModal from '../../../ShareQuotation/QuotationModal';

import styles from './styles.module.css';

function BookingVerification() {
	const {
		rate,
		detail,
		invoice,
		orgData,
		updateCheckout,
		updateLoading,
	} = useContext(CheckoutContext);

	const [showShareQuotationModal, setShowShareQuotationModal] = useState(false);

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

			<Button
				type="button"
				size="md"
				onClick={() => setShowShareQuotationModal(true)}
			>
				Share Quotation
			</Button>
		</div>
	);
}

export default BookingVerification;
