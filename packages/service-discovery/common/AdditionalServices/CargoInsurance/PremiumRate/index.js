import { Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const PREMIUM = 0;
const PLATFORM_CHARGES = 1;
const CONVENIENCE_CHARGES = 2;
const geo = getGeoConstants();

const formatAmounts = (amount) => formatAmount({
	amount,
	currency : geo.country.currency.code,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function PremiumRate({ rateData = {} }) {
	const {
		serviceChargeList = [],
		totalCharges = 0,
	} = rateData || {};

	return (
		<div className={styles.container}>
			<div className={styles.rate_item}>
				<div className={styles.premium_rate_label_container}>
					<span className={styles.label}>Premium:</span>

					<Tooltip
						theme="light"
						placement="bottom"
						content="Exclusive of Taxes"
					>
						<IcMInfo className={styles.info_icon} />
					</Tooltip>
				</div>

				<span className={styles.price}>
					{formatAmounts(serviceChargeList?.[PREMIUM]?.totalCharges)}
				</span>
			</div>

			<div className={styles.rate_item}>
				<span className={styles.label}>Platform Charges:</span>

				<span className={styles.price}>
					{formatAmounts(serviceChargeList?.[PLATFORM_CHARGES]?.totalCharges)}
				</span>
			</div>

			<div className={cl`${styles.rate_item} ${styles.final}`}>
				<span className={styles.label}>Convenience Fee:</span>

				<span className={styles.price}>
					{formatAmounts(serviceChargeList?.[CONVENIENCE_CHARGES]?.totalCharges)}
				</span>
			</div>

			<div className={styles.rate_item}>
				<span className={styles.strong_label}>Amount Payable:</span>

				<span className={styles.strong_price}>{formatAmounts(totalCharges)}</span>
			</div>
		</div>
	);
}

export default PremiumRate;
