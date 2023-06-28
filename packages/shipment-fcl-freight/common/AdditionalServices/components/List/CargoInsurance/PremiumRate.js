import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const formatAmounts = (amount) => formatAmount({
	amount,
	currency : GLOBAL_CONSTANTS.currency_code.INR,
	options  : {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function PremiumRate({ rateData }) {
	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
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
								<div>Inclusive of Taxes</div>
							</div>
						)}
					>
						<IcMInfo />
					</Tooltip>
				</div>

				<div>{formatAmounts(netPremium)}</div>
			</div>

			<div className={styles.rate}>
				<div>Platform Charges:</div>
				<div>{formatAmounts(platformCharges)}</div>
			</div>

			<div className={cl`${styles.rate} ${styles.final}`}>
				<div>Convenience Fee:</div>
				<div>{formatAmounts(convenienceFee)}</div>
			</div>

			<div className={styles.rate}>
				<div>Amount Payable:</div>
				<div>{formatAmounts(totalApplicableCharges)}</div>
			</div>
		</div>
	);
}

export default PremiumRate;
