import { cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const CHARGES = ['Premium', 'Platform Charges', 'Convenience Fee'];
const DEFAULT_AMOUNT = 0;

const geo = getGeoConstants();

const formarAmountData = (amount) => formatAmount({
	amount,
	currency : geo.country.currency.code,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 2,
	},
});

function PremiumLineItem({ amount = 0, item = '', key = '' }) {
	return (
		<div className={styles.premium_line_item} key={key}>
			<span className={styles.text}>{item}</span>
			<div className={cl`${styles.flex_row} ${styles.values}`}>
				<hr className={styles.line} />
				{formarAmountData(amount)}
			</div>
		</div>
	);
}

function PremiumRate({ premiumLoading = false, premiumData = {} }) {
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
				? CHARGES.map((item) => PremiumLineItem({ amount: DEFAULT_AMOUNT, item, key: item?.displayName }))
				: premiumData?.serviceChargeList?.map((item) => PremiumLineItem({
					amount : item?.totalCharges,
					item   : item?.displayName,
					key    : item?.displayName,
				}))}

			<hr className={styles.line} />
			{PremiumLineItem({ amount: premiumData?.totalApplicableCharges, item: 'Amount Payable', key: '' })}
		</div>
	);
}

export default PremiumRate;
