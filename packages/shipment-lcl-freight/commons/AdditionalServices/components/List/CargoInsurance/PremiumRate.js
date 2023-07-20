import { Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

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

				<div>{formatAmounts(serviceChargeList?.[GLOBAL_CONSTANTS.zeroth_index]?.totalCharges)}</div>
			</div>

			<div className={styles.rate}>
				<span>Platform Charges:</span>
				<div>{formatAmounts(serviceChargeList?.[PLATFORM_CHARGES]?.totalCharges)}</div>
			</div>

			<div className={cl`${styles.rate} ${styles.final}`}>
				<span>Convenience Fee:</span>
				<div>{formatAmounts(serviceChargeList?.[CONVENIENCE_CHARGES]?.totalCharges)}</div>
			</div>

			<div className={styles.rate}>
				<span>Amount Payable:</span>
				<div>{formatAmounts(totalCharges)}</div>
			</div>
		</div>
	);
}

export default PremiumRate;
