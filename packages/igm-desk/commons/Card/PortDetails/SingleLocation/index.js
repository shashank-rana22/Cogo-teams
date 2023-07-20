import { Tooltip } from '@cogoport/components';
import React from 'react';

import ServiceIcon from '../../ServiceIcon';

import styles from './styles.module.css';

function PortDetails({ data = {}, icon = {} }) {
	const { port, trade_type } = data;

	return (
		<div className={styles.container}>
			<ServiceIcon {...icon} />

			<div className={styles.single_location}>
				{trade_type === 'export' ? 'Origin' : 'Destination'}
				{' '}
				:
			</div>

			<div className={styles.port_detail}>
				<div className={styles.port_code}>
					<div className={styles.code}>
						(
						{port?.port_code || port?.postal_code}
						)
					</div>

					<div className={styles.country}>
						{port?.country_code}
					</div>
				</div>

				<Tooltip
					placement="bottom"
					theme="light"
					interactive
					content={port?.display_name}
				>
					<div className={styles.ellipsis_text}>{port?.name}</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default PortDetails;
