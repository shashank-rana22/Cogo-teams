import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

function TotalLandedCost({
	rateCardData = {},
	createCheckoutLoading = false,
	handleBook = () => {},
}) {
	const { total_price_discounted = 0, total_price_currency = 'INR' } = rateCardData;

	return (
		<div className={styles.container}>
			<div className={styles.total_price}>
				Total landed Cost:
				<span style={{ fontWeight: 600, fontSize: 16, marginLeft: 8 }}>
					{formatAmount({
						amount   : total_price_discounted || ZERO_VALUE,
						currency : total_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</span>
			</div>

			<Button
				onClick={handleBook}
				size="lg"
				themeType="accent"
				className={styles.proceed_button}
				loading={createCheckoutLoading}
			>
				Proceed to Adjust Margins
			</Button>
		</div>
	);
}

export default TotalLandedCost;
