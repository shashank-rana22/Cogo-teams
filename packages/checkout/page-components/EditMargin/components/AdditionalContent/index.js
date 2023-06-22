import { useContext } from 'react';

import Cancellation from '../../../../commons/Cancellation';
import ConfirmationTexts from '../../../../commons/ConfirmationTexts';
import { CheckoutContext } from '../../../../context';

import ShareQuotation from './ShareQuotation';
import styles from './styles.module.css';

function AdditionalContent({
	userSettings,
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
	} = useContext(CheckoutContext);

	const { services = {}, trade_type = '' } = detail;

	return (
		<div className={styles.container}>
			<div className={styles.sub_heading}>Cancellation Policy</div>
			<Cancellation
				detail={detail}
				serviceType={primaryService?.service_type}
			/>

			<ConfirmationTexts
				primaryService={primaryService}
				trade_type={trade_type}
				services={rate?.services || []}
				detail={detail}
				detailedServices={Object.values(services)}
			/>

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
			/>
		</div>
	);
}

export default AdditionalContent;
