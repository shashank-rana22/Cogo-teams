import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const TRADE_TYPE_MAPPING = {
	import : 'Origin',
	export : 'Destination',
};

function SingleLocations({
	singleOriginDisplay = {},
	singleDestinationDisplay = {},
	serviceData = {},
}) {
	const { trade_type: tradeType = '' } = serviceData || {};

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	return (
		<div className={styles.container}>
			<div className={styles.flex_row_origin}>
				<div className={styles.label}>
					{TRADE_TYPE_MAPPING[tradeType]}
					:
				</div>
			</div>

			<div className={styles.flex_row_origin}>
				<div className={styles.port_details}>
					<Tooltip content={DISPLAY_DATA_MAPPING[tradeType]?.name} placement="bottom">
						<div className={styles.single_port}>
							{DISPLAY_DATA_MAPPING[tradeType]?.name}
						</div>
					</Tooltip>
					<div className={styles.port_codes}>
						(
						{DISPLAY_DATA_MAPPING[tradeType]?.code}
						)
					</div>
				</div>

				<div className={styles.country}>
					{DISPLAY_DATA_MAPPING[tradeType]?.country}
				</div>
			</div>
		</div>
	);
}

export default SingleLocations;
