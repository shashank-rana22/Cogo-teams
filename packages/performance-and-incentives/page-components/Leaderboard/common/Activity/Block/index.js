import { IcMAccountEnrichment, IcMAccounts, IcMEngagement, IcMShipment } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import ACTIVITY_CONSTANTS from '../../../../../constants/activity-constants';

import styles from './styles.module.css';

const MIN_VALUE = 0;

const { ENGAGEMENT, ACCOUNTS, ENRICHMENT, SHIPMENTS } = ACTIVITY_CONSTANTS;

const COMPONENT_MAPPING = {
	[ENGAGEMENT]: {
		Icon    : IcMEngagement,
		heading : 'Engagement',
	},
	[ACCOUNTS]: {
		Icon    : IcMAccounts,
		heading : 'Accounts',
	},
	[ENRICHMENT]: {
		Icon    : IcMAccountEnrichment,
		heading : 'Enrichment',
	},
	[SHIPMENTS]: {
		Icon    : IcMShipment,
		heading : 'Shipments',
	},
};

function Block(props) {
	const { activity, block } = props;

	const { Icon, heading } = COMPONENT_MAPPING[activity] || {};

	return (
		<div className={styles.container}>
			<div className={styles.block_container}>
				<Icon height={20} width={20} style={{ marginRight: '8px' }} />
				<p className={styles.block_text}>{heading || ''}</p>
			</div>

			<div className={styles.activity_container}>
				{block.map(({ name, count }) => (
					<div className={styles.param_container} key={name}>
						<div className={styles.value_text_container}>
							<p className={styles.value_text}>{count || MIN_VALUE}</p>
						</div>

						<p className={styles.label_text}>{startCase(name || '')}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Block;
