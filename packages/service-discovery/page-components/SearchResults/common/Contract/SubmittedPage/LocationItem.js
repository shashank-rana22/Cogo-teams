import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LocationItem({ location = {} }) {
	const { name, port_code, country_code } = location || {};

	return (
		<div className={styles.location}>
			<span className={styles.location_country_text}>
				{port_code ? `${port_code}, ` : null}
				{country_code}
			</span>

			<Tooltip
				placement="top"
				className={styles.tooltip}
				content={<span className={styles.tooltip_content}>{name}</span>}
			>
				<div
					className={styles.location_port_text}
					style={{ maxWidth: origin ? '' : '80%' }}
				>
					{name}
				</div>
			</Tooltip>
		</div>
	);
}

export default LocationItem;
