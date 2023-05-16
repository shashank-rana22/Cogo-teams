import { Tooltip } from '@cogoport/components';
import React from 'react';

import getLocation from '../../../../utils/getLocation';

import styles from './styles.module.css';

function PortDetails({ data = {} }) {
	const { trade_type, location } = data;
	const { origin } = getLocation({ data });

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<div className={styles.single_location}>
				{trade_type === 'export' ? 'Origin :' : 'Destination :'}
			</div>

			<div className={styles.port_detail}>
				<div className={styles.port_code}>
					<div className={`${styles.code} core_ui_port_code`}>
						(
						{origin?.port_code || origin?.postal_code || location?.port_code}
						)
					</div>

					<div className={`${styles.country} core_ui_country_code`}>
						{origin?.country_code}
					</div>
				</div>

				<Tooltip
					placement="bottom"
					theme="light"
					interactive
					content={origin?.display_name || location?.display_name}
				>
					<div className={`${styles.ellipsis_text} core_ui_loaction_name`}>
						{origin?.name || location?.name}
					</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default PortDetails;
