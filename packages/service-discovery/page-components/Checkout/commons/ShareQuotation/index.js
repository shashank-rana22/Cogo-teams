import { Button, CheckboxGroup } from '@cogoport/components';
import { useContext } from 'react';

import { CheckoutContext } from '../../context';

import EmailConfirmation from './EmailConfirmation';
import PocDetails from './PocDetails';
import QuotationModal from './QuotationModal';
import styles from './styles.module.css';
import useHandleShareQuotation from './useHandleShareQuotation';

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
		setSelectedModes,
		selectedModes,
		setShowShareQuotationModal,
		confirmation,
		setConfirmation,
		handleCopyQuoteLink,
	} = useHandleShareQuotation({
		detail,
		updateCheckout,
		noRatesPresent,
	});

	return (
		<div className={styles.container}>
			<div className={styles.contact_details}>
				<div className={styles.yellow_bg} />

				<div className={styles.main_container}>
					<PocDetails
						detail={detail}
						bookingConfirmationMode={selectedModes}
						showWhatsappVerificationModal={showWhatsappVerificationModal}
						setShowWhatsappVerificationModal={setShowWhatsappVerificationModal}
						updateCheckout={updateCheckout}
						updateLoading={updateLoading}
					/>

					<CheckboxGroup
						className="primary md"
						options={quotationOptions}
						value={selectedModes || ''}
						onChange={setSelectedModes}
					/>
				</div>
			</div>

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
				{BUTTON_MAPPING.map((item) => {
					const { label, key, onClickFunction = () => {}, ...restProps } = item;

					return (
						<Button
							key={key}
							type="button"
							size="lg"
							onClick={onClickFunction}
							{...restProps}
						>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default ShareQuotation;
