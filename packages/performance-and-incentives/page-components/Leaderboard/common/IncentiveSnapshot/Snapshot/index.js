import { IcMPaymentmade, IcMProvisional, IcMRealisedPayment } from '@cogoport/icons-react';

import INCENTIVE_SNAPSHOT_CONSTANTS from '../../../constants/incentive-snapshot-constants';

import styles from './styles.module.css';

const { PROVISIONAL, REALIZED, PAYOUT } = INCENTIVE_SNAPSHOT_CONSTANTS;

const COMPONENT_MAPPING = {
	[PROVISIONAL]: {
		Icon    : IcMProvisional,
		heading : 'Provisional',
	},
	[REALIZED]: {
		Icon    : IcMRealisedPayment,
		heading : 'Realized',
	},
	[PAYOUT]: {
		Icon    : IcMPaymentmade,
		heading : 'Payout',
	},
};

function Snapshot(props) {
	const { stage } = props;

	const { Icon, heading } = COMPONENT_MAPPING[stage] || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.heading}>{heading}</p>

				<div className={styles.icon_background}>
					<Icon className={styles.icon} background="yellow" height={20} width={20} />
				</div>
			</div>

			<div className={styles.cmg_soon}>Coming Soon!</div>
		</div>
	);
}

export default Snapshot;
