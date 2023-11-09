import { useContext } from 'react';

import EditMarginFooter from '../../../../../commons/EditMarginFooter';
import { CheckoutContext } from '../../../../../context';
import AdditionalServices from '../../../commons/AdditionalServices';

import styles from './styles.module.css';

function AdditionalContent({
	rateDetails = [],
	convenienceDetails = {},
	convenience_line_item = {},
	noRatesPresent = false,
	state = '',
}) {
	const {
		rate,
		detail,
		primaryService,
		getCheckout,
		setHeaderProps,
		possible_subsidiary_services = [],
		loading,
		updateCheckout,
		updateLoading = false,
	} = useContext(CheckoutContext);

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

			<EditMarginFooter
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				noRatesPresent={noRatesPresent}
				loading={loading}
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				state={state}
			/>
		</div>
	);
}

export default AdditionalContent;
