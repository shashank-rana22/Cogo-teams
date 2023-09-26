import { Tooltip } from '@cogoport/components';
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
	const { activity, data } = props;

	const AcitivityIcon = ACTIVITY_ICON_MAPPING[activity] || IcMEngagement;

	const HighLighterColor = BACKGROUND_COLOR_MAPPING[activity] || '#f8aea8';

	return (
		<div>
			<div className={styles.header}>
				<AcitivityIcon className={styles.activity_icon} />

				<div className={styles.highlighter} style={{ backgroundColor: HighLighterColor }} />

				<p className={styles.heading}>{isEmpty(activity) ? '' : startCase(activity)}</p>
			</div>

			<div className={styles.block_container}>
				{(data || []).map((item) => {
					const { name, count } = item || {};

					return (
						<div key={activity} className={styles.activity_container}>
							<p className={styles.value}>{count}</p>
							<Tooltip content={<p>{isEmpty(name) ? '' : startCase(name)}</p>}>
								<p className={styles.activity}>{isEmpty(name) ? '' : startCase(name)}</p>
							</Tooltip>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Block;
