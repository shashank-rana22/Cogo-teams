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
		detail,
		getCheckout,
		possible_subsidiary_services = [],
		loading,
		updateCheckout,
		updateLoading = false,
		primaryService = {},
		setHeaderProps = () => {},
		rate = {},
	} = useContext(CheckoutContext);

	return (
		<div className={styles.container}>
			<AdditionalServices
				detail={detail}
				getCheckout={getCheckout}
				possible_subsidiary_services={possible_subsidiary_services}
				servicesLength={rateDetails.length}
				loading={loading}
				primaryService={primaryService}
				setHeaderProps={setHeaderProps}
				rate={rate}
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
