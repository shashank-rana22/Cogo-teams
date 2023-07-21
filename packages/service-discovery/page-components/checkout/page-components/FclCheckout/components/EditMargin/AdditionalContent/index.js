import { useContext } from 'react';

import Cancellation from '../../../../../commons/Cancellation';
import ConfirmationTexts from '../../../../../commons/ConfirmationTexts';
import DefaultQuotationInfo from '../../../../../commons/DefaultQuotationInfo';
import ShareQuotation from '../../../../../commons/ShareQuotation';
import { CheckoutContext } from '../../../../../context';

import AdditionalServices from './AdditionalServices';
import styles from './styles.module.css';

function AdditionalContent({
	rateDetails = [],
	additionalRemark = '',
	convenienceDetails = {},
	convenience_line_item = {},
	noRatesPresent = false,
}) {
	const {
		rate,
		detail,
		primaryService,
		getCheckout,
		setHeaderProps,
		possible_subsidiary_services = [],
		loading,
	} = useContext(CheckoutContext);

	const { services = {}, trade_type = '' } = detail;

	return (
		<div className={styles.container}>
			<AdditionalServices
				rate={rate}
				detail={detail}
				setHeaderProps={setHeaderProps}
				primaryService={primaryService}
				getCheckout={getCheckout}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				servicesLength={rateDetails.length}
			/>

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
				rateDetails={rateDetails}
				additionalRemark={additionalRemark}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				noRatesPresent={noRatesPresent}
			/>
		</div>
	);
}

export default AdditionalContent;
