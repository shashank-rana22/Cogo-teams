import { ToolTip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.modules.css';

function PremiumRate({ rateData }) {
	const {
		convenienceFee = 0,
		platformCharges = 0,
		netPremium = 0,
		totalApplicableCharges = 0,
	} = rateData || {};

	const formatAmounts = (amount) => formatAmount({
		amount,
		currency : GLOBAL_CONSTANTS.currency_code.INR,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	});

	return (
		<div>
			<div className={styles.rate}>
				<div className={styles.box_div}>
					Premium:
					<ToolTip
						theme="light"
						placement="top"
						content={(
							<div className={styles.tooltip_container}>
								<div>Inclusive of Taxes</div>
							</div>
						)}
					>
						<div>
							<IcMInfo />
						</div>
					</ToolTip>
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
