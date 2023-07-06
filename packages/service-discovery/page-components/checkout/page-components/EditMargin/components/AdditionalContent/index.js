import { useContext } from 'react';

import Cancellation from '../../../../commons/Cancellation';
import ConfirmationTexts from '../../../../commons/ConfirmationTexts';
import DefaultQuotationInfo from '../../../../commons/DefaultQuotationInfo';
import { CheckoutContext } from '../../../../context';

import ShareQuotation from './ShareQuotation';
import styles from './styles.module.css';

function AdditionalContent({
	userSettings,
	rateDetails,
	additionalRemark,
	convenienceDetails,
	convenience_line_item,
	setShouldResetMargins,
}) {
	const {
		rate,
		detail,
		primaryService,
		isOrgCP,
		organization_settings,
		checkoutMethod,
		excludeWhatsapp,
		bookingConfirmationMode,
		setBookingConfirmationMode,
		isChannelPartner,
		getCheckout,
		checkout_id,
		setCheckoutState,
		invoice,
		orgData,
		updateCheckout,
		updateLoading,
	} = useContext(CheckoutContext);

	const { services = {}, trade_type = '' } = detail;

	return (
		<div className={styles.container}>
			<div className={styles.sub_heading}>Cancellation Policy</div>
			<Cancellation
				detail={detail}
				serviceType={primaryService?.service_type}
				source="edit_margin"
			/>

			<ConfirmationTexts
				primaryService={primaryService}
				trade_type={trade_type}
				services={rate?.services || []}
				detail={detail}
				detailedServices={Object.values(services)}
			/>

			<DefaultQuotationInfo />

			<div className={styles.sub_heading}>Share Quotation with</div>

			<ShareQuotation
				detail={detail}
				organization_settings={organization_settings}
				isOrgCP={isOrgCP}
				userSettings={userSettings}
				checkoutMethod={checkoutMethod}
				excludeWhatsapp={excludeWhatsapp}
				bookingConfirmationMode={bookingConfirmationMode}
				setBookingConfirmationMode={setBookingConfirmationMode}
				isChannelPartner={isChannelPartner}
				getCheckout={getCheckout}
				additionalRemark={additionalRemark}
				rateDetails={rateDetails}
				rate={rate}
				checkout_id={checkout_id}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				setShouldResetMargins={setShouldResetMargins}
				setCheckoutState={setCheckoutState}
				invoice={invoice}
				orgData={orgData}
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
			/>
		</div>
	);
}

export default AdditionalContent;
