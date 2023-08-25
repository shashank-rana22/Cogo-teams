import { useContext } from 'react';

import { CheckoutContext } from '../../../../../context';

// import AdditionalServices from './AdditionalServices';
import EditMarginFooter from './EditMarginFooter';
import styles from './styles.module.css';

function AdditionalContent({
	rateDetails = [],
	convenienceDetails = {},
	convenience_line_item = {},
	noRatesPresent = false,
	state = '',
	infoBanner = {},
	setInfoBanner = () => {},
}) {
	const {
		// rate,
		// detail,
		// primaryService,
		// getCheckout,
		// setHeaderProps,
		// possible_subsidiary_services = [],
		loading,
		updateCheckout,
		updateLoading = false,
	} = useContext(CheckoutContext);

	return (
		<div className={styles.container}>
			{/* <AdditionalServices
				rate={rate}
				detail={detail}
				setHeaderProps={setHeaderProps}
				primaryService={primaryService}
				getCheckout={getCheckout}
				loading={loading}
				possible_subsidiary_services={possible_subsidiary_services}
				servicesLength={rateDetails.length}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/> */}

			<EditMarginFooter
				updateCheckout={updateCheckout}
				updateLoading={updateLoading}
				noRatesPresent={noRatesPresent}
				loading={loading}
				rateDetails={rateDetails}
				convenienceDetails={convenienceDetails}
				convenience_line_item={convenience_line_item}
				state={state}
				setInfoBanner={setInfoBanner}
				infoBanner={infoBanner}
			/>
		</div>
	);
}

export default AdditionalContent;
