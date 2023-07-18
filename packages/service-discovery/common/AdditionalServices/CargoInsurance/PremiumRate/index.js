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
		<div>
			<div className={styles.rate}>
				<div className={styles.box_div}>
					<span>Premium:</span>
					<Tooltip
						theme="light"
						placement="bottom"
						content={(
							<div className={styles.tooltip_container}>
								<div>Exclusive of Taxes</div>
							</div>
						)}
					>
						<IcMInfo />
					</Tooltip>
				</div>

				<div>{formatAmounts(serviceChargeList?.[PREMIUM]?.totalCharges)}</div>
			</div>

			<div className={styles.rate}>
				<div>Platform Charges:</div>
				<div>{formatAmounts(serviceChargeList?.[PLATFORM_CHARGES]?.totalCharges)}</div>
			</div>

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div>Convenience Fee:</div>
				<div>{formatAmounts(serviceChargeList?.[CONVENIENCE_CHARGES]?.totalCharges)}</div>
			</div>

			<div className={styles.rate}>
				<div>Amount Payable:</div>
				<div>{formatAmounts(totalCharges)}</div>
			</div>
		</div>
	);
}

export default PremiumRate;
