import { IcMDefault } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { PercentageChange } from '../../../../common/Elements';
import { ICONS_MAPPING } from '../../../../constants';

import styles from './styles.module.css';

const DATA = {
	email: {
		customer_percentage : 30,
		total_count         : 300,
		change              : -17,
	},
	whatsapp: {
		customer_percentage : 60,
		total_count         : 900,
		change              : 9,
	},
};

function ReceivedStats({ channelType = '' }) {
	const Element = ICONS_MAPPING?.[channelType] || IcMDefault;

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				Total
				{' '}
				{startCase(channelType)}
				{' '}
				Received
			</div>

			<div className={styles.body}>
				<div className={styles.icon_container}>
					<Element
						className={styles.icon_styles}
						fill={channelType === 'email' ? '#034AFD' : 'unset'}
					/>
				</div>

				<div className={styles.total_data}>
					<div className={styles.total_count}>
						{DATA?.[channelType]?.total_count}
					</div>

					<PercentageChange
						percentageChanged={DATA?.[channelType]?.change}
						showArrows
					/>
				</div>
			</div>

			<div className={styles.header_chip}>
				Initiated by Customer -
				<span className={styles.highlight}>
					{DATA?.[channelType]?.customer_percentage}
					%
				</span>
			</div>
		</div>
	);
}

export default ReceivedStats;
