import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMJobsView, IcMPaymentmade, IcMProvisional, IcMRealisedPayment } from '@cogoport/icons-react';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../constants/leaderboard-reporttype-constants';
import INCENTIVE_SNAPSHOT_CONSTANTS from '../../../constants/incentive-snapshot-constants';
import useReloadCounter from '../../../hooks/useReloadCounter';

import styles from './styles.module.css';

const { PROVISIONAL, REALIZED, PAYOUT } = INCENTIVE_SNAPSHOT_CONSTANTS;

const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

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

const getClock = (number) => {
	if (number < 10) return `00:0${number}`;
	return `00:${number}`;
};

function Snapshot(props) {
	const { stage, currLevel, userIncentiveData, userIncentiveStatsLoading } = props;

	const { incentive_currency } = userIncentiveData || {};

	const { Icon, heading, key } = COMPONENT_MAPPING[stage] || {};

	const { reloadCounter, startTimer } = useReloadCounter();

	let content = null;

	if (userIncentiveStatsLoading) {
		content = <Placeholder height="14px" style={{ marginTop: '20px' }} />;
	} else if (currLevel.report_type !== AGENT_REPORT) {
		content = <div className={styles.cmg_soon}>Coming Soon!</div>;
	} else {
		content = (
			<div className={styles.amount_div}>
				<h3 className={`${reloadCounter === 0 ? styles.blurred : ''}`}>
					{`${GLOBAL_CONSTANTS.currency_symbol
						?.[incentive_currency || 'INR']}${userIncentiveData?.[key] || ZERO_INCENTIVE}`}
				</h3>
				<span className={styles.counter_div}>
					{reloadCounter === 0 ? (
						<IcMJobsView
							height={24}
							width={24}
							onClick={() => startTimer(10)}
						/>
					) : getClock(reloadCounter)}
				</span>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>{heading}</p>

				<div className={styles.icon_background}>
					<Icon className={styles.icon} background="yellow" height={20} width={20} />
				</div>
			</div>

			{content}
		</div>
	);
}

export default Snapshot;
