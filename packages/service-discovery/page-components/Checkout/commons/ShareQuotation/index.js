import { Button, Popover } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import EmailConfirmation from './EmailConfirmation';
import PocDetails from './PocDetails';
import QuotationCommunicationChannels from './QuotationCommunicationChannels';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';
import SuccessModal from './SuccessModal';
import useHandleShareQuotation from './useHandleShareQuotation';

const PopoverContent = dynamic(
	() => import(
		'./StyledPopover'
	),
	{ ssr: false },
);
function ShareQuotation({ noRatesPresent = false, bookingConfirmationMode = '' }) {
	const {
		rate,
		detail,
		invoice,
		orgData,
		updateCheckout,
		updateLoading,
	} = useContext(CheckoutContext);

	const {
		BUTTON_MAPPING,
		size,
		widths,
		quotationOptions,
		showWhatsappVerificationModal,
		setShowWhatsappVerificationModal,
		showShareQuotationModal,
		selectedModes,
		setShowShareQuotationModal,
		confirmation,
		setConfirmation,
		handleCopyQuoteLink,
		showPopover,
		setShowPopover,
		showSuccessModal = () => {},
		setShowSuccessModal = () => {},
	} = useHandleShareQuotation({
		detail,
		updateCheckout,
		noRatesPresent,
	});

	return (
		<div className={styles.container}>
			<div className={styles.poc_details}>
				<PocDetails
					detail={detail}
					bookingConfirmationMode={selectedModes}
					showWhatsappVerificationModal={showWhatsappVerificationModal}
					setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
				/>

				<QuotationCommunicationChannels
					quotationOptions={quotationOptions}
					selectedModes={selectedModes}
				/>
			</div>

			<SuccessModal
				show={showSuccessModal}
				setShow={setShowSuccessModal}
				quotationOptions={quotationOptions}
			/>

			{showShareQuotationModal ? (
				<QuotationModal
					modalSize={size}
					selectedModes={selectedModes}
					setShowShareQuotationModal={setShowShareQuotationModal}
					showShareQuotationModal={showShareQuotationModal}
					invoice={invoice}
					rate={rate}
					detail={detail}
					organization={orgData}
					widths={widths}
					updateCheckout={updateCheckout}
					updateLoading={updateLoading}
					bookingConfirmationMode={bookingConfirmationMode}
					setShowSuccessModal={setShowSuccessModal}
				/>
			) : null}

			{confirmation ? (
				<EmailConfirmation
					confirmation={confirmation}
					handleSendEmail={handleCopyQuoteLink}
					setConfirmation={setConfirmation}
				/>
			) : null}

			<div className={styles.button_container}>
				<Popover
					placement="top"
					caret
					render={(
						<PopoverContent BUTTON_MAPPING={BUTTON_MAPPING} />
					)}
					visible={showPopover}
				>
					<Button
						type="button"
						themeType="primary"
						onClick={() => setShowPopover((prev) => !prev)}
						size="md"
					>
						{showPopover ? 'Click Here to close Popover' : 'Share Quotation and Add to Cart'}
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default ShareQuotation;
