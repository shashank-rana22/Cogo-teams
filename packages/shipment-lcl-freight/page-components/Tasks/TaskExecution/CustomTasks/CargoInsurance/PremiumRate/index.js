import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CHARGES = ['Premium', 'Platform Charges', 'Convenience Fee'];
const DEFAULT_AMOUNT = 0;

const formarAmountData = (amount, geo) => formatAmount({
	amount,
	currency : geo.country.currency.code,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

function PremiumLineItem({ amount = 0, item = '', key = '', geo = {} }) {
	return (
		<div className={styles.premium_line_item} key={key}>
			<span className={styles.text}>{item}</span>
			<div className={cl`${styles.flex_row} ${styles.values}`}>
				<hr className={styles.line} />
				{formarAmountData(amount, geo)}
			</div>
		</div>
	);
}

function PremiumRate({ premiumLoading = false, premiumData = {} }) {
	const geo = getGeoConstants();

	if (premiumLoading) {
		return (
			<div className={cl`${styles.premium_value} ${styles.loading}`}>
				<span className={cl`${styles.text} ${styles.bold}`}>Please wait while we fetch Details!!!!!!</span>
			</div>
		);
	}

	return (
		<div className={styles.premium_value}>
			{isEmpty(premiumData?.serviceChargeList)
				? CHARGES.map((item) => (
					<PremiumLineItem
						amount={DEFAULT_AMOUNT}
						item={item}
						key={item?.displayName}
						geo={geo}
					/>
				))
				: premiumData?.serviceChargeList?.map((item) => (
					<PremiumLineItem
						amount={item?.totalCharges}
						item={item?.displayName}
						key={item?.displayName}
						geo={geo}
					/>
				))}

			<hr className={styles.line} />
			<PremiumLineItem
				amount={premiumData?.totalApplicableCharges}
				item="Amount Payable"
				key=""
				geo={geo}
			/>
		</div>
	);
}

export default PremiumRate;
