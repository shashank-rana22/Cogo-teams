import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {} }) {
	const { port, trade_type } = data;

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<div className={styles.single_location}>
				{trade_type === 'export' ? 'Origin' : 'Destination'}
				{' '}
				:
			</div>

			<div className={styles.port_detail}>
				<div className={styles.port_code}>
					<div className={`${styles.code} core_ui_port_code`}>
						(
						{port?.port_code || port?.postal_code}
						)
					</div>

					<div className={`${styles.country} core_ui_country_code`}>
						{port?.country_code}
					</div>
				</div>

				<Tooltip
					placement="bottom"
					theme="light"
					interactive
					content={port?.display_name}
				>
					<div className={`${styles.ellipsis_text} core_ui_loaction_name`}>{port?.name}</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default PortDetails;
