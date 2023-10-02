import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPaymentmade, IcMProvisional, IcMRealisedPayment } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import INCENTIVE_SNAPSHOT_CONSTANTS from '../../../constants/incentive-snapshot-constants';

import styles from './styles.module.css';

const { PROVISIONAL, REALIZED, PAYOUT } = INCENTIVE_SNAPSHOT_CONSTANTS;

const COMPONENT_MAPPING = {
	[PROVISIONAL]: {
		Icon    : IcMProvisional,
		heading : 'Provisional',
		key     : 'total_provisional_incentive',
	},
	[REALIZED]: {
		Icon    : IcMRealisedPayment,
		heading : 'Realized',
		key     : 'total_realised_incentive',
	},
	[PAYOUT]: {
		Icon    : IcMPaymentmade,
		heading : 'Payout',
		key     : 'total_payable_incentive',
	},
};

const ZERO_INCENTIVE = 0;

function Snapshot(props) {
	const { stage, userIncentiveData, userIncentiveStatsLoading } = props;

	const { incentive_currency } = userIncentiveData || {};

	const { Icon, heading, key } = COMPONENT_MAPPING[stage] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>{heading}</p>

				<div className={styles.icon_background}>
					<Icon className={styles.icon} background="yellow" height={20} width={20} />
				</div>
			</div>

			{userIncentiveStatsLoading ? <Placeholder height="14px" style={{ marginTop: '20px' }} /> : null}

			{!userIncentiveStatsLoading && isEmpty(userIncentiveData)
				? <div className={styles.cmg_soon}>Coming Soon!</div> : null}

			{!userIncentiveStatsLoading && !isEmpty(userIncentiveData) ? (
				<h3>
					{GLOBAL_CONSTANTS.currency_symbol[incentive_currency]}
					{userIncentiveData[key] || ZERO_INCENTIVE}
				</h3>
			) : null}

		</div>
	);
}

export default Snapshot;
