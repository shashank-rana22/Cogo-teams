import { IcMEngagement, IcMAccounts, IcMAccountEnrichment, IcMShipment } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import ACTIVITY_CONSTANTS from '../../../../../../constants/activity-constants';

import styles from './styles.module.css';

const { ENGAGEMENT, ACCOUNTS, ENRICHMENT, SHIPMENTS } = ACTIVITY_CONSTANTS;

const ACTIVITY_ICON_MAPPING = {
	[ENGAGEMENT] : IcMEngagement,
	[ACCOUNTS]   : IcMAccounts,
	[ENRICHMENT] : IcMAccountEnrichment,
	[SHIPMENTS]  : IcMShipment,
};

const BACKGROUND_COLOR_MAPPING = {
	[ENGAGEMENT] : '#f8aea8',
	[ACCOUNTS]   : '#ddebc0',
	[ENRICHMENT] : '#ddebc0',
	[SHIPMENTS]  : '#f8aea8',
};

function Block(props) {
	const { block, data } = props;

	const AcitivityIcon = ACTIVITY_ICON_MAPPING[block] || IcMEngagement;

	const HighLighterColor = BACKGROUND_COLOR_MAPPING[block] || '#f8aea8';

	return (
		<div>
			<div className={styles.header}>
				<AcitivityIcon width={20} height={20} style={{ marginRight: '8px' }} />

				<div className={styles.highlighter} style={{ backgroundColor: HighLighterColor }} />

				<p className={styles.heading}>{isEmpty(block) ? '' : startCase(block)}</p>
			</div>

			<div className={styles.block_container}>
				{Object.entries(data).map(([activity, value]) => (
					<div key={activity} className={styles.activity_container}>
						<p className={styles.value}>{value}</p>
						<p className={styles.activity}>{isEmpty(activity) ? '' : startCase(activity)}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Block;
