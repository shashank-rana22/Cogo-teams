import { useContext } from 'react';

import EditMarginFooter from '../../../../../commons/EditMarginFooter';
import { CheckoutContext } from '../../../../../context';

import styles from './styles.module.css';

function AdditionalContent({
	rateDetails = [],
	convenienceDetails = {},
	convenience_line_item = {},
	noRatesPresent = false,
	state = '',
}) {
	const {
		loading,
		updateCheckout,
		updateLoading = false,
	} = useContext(CheckoutContext);

	return (
		<div className={styles.container}>
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
