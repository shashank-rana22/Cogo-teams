import { IcADiscover } from '@cogoport/icons-react';

import INCENTIVE_SNAPSHOT_CONSTANTS from '../../../constants/incentive-snapshot-constants';

import styles from './styles.module.css';

const { PROVISIONAL, REALIZED, PAYOUT } = INCENTIVE_SNAPSHOT_CONSTANTS;

const COMPONENT_MAPPING = {
	[PROVISIONAL]: {
		Icon    : IcADiscover,
		heading : 'Provisional',
	},
	[REALIZED]: {
		Icon    : IcADiscover,
		heading : 'Realized',
	},
	[PAYOUT]: {
		Icon    : IcADiscover,
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

				<Icon height={20} width={20} />
			</div>

			<div className={styles.amount_container}>
				<p className={styles.amount}>$ 5000</p>

				<p className={styles.body_text}>until today</p>
			</div>

			<p className={styles.footer_text}>+$20 than this date last month</p>
		</div>
	);
}

export default Snapshot;
