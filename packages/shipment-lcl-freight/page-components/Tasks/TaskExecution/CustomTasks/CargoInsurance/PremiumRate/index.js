import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CHARGES = ['Premium', 'Platform Charges', 'Convenience Fee'];
const DEFAULT_AMOUNT = 0;

function PremiumRate({ premiumLoading = false, premiumData = {} }) {
	const formarAmountData = (amount) => formatAmount({
		amount,
		currency : 'INR',
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'symbol',
			maximumFractionDigits : 2,
		},
	});

	const getPremiumLineItem = ({ amount, item, key }) => (
		<div className={styles.premium_line_item} key={key}>
			<span className={styles.text}>{item}</span>
			<div className={cl`${styles.flex_row} ${styles.values}`}>
				<hr className={styles.line} />
				{formarAmountData(amount)}
			</div>
		</div>
	);

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
				? CHARGES.map((item) => getPremiumLineItem({ amount: DEFAULT_AMOUNT, item, key: item?.displayName }))
				: premiumData?.serviceChargeList?.map((item) => getPremiumLineItem({
					amount : item?.totalCharges,
					item   : item?.displayName,
					key    : item?.displayName,
				}))}

			<hr className={styles.line} />
			{getPremiumLineItem({ amount: premiumData?.totalApplicableCharges, item: 'Amount Payable', key: '' })}
		</div>
	);
}

export default PremiumRate;
