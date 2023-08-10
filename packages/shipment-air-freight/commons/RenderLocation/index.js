import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function RenderLocation({ primary_service = {} }) {
	const {
		origin_airport = {},
		destination_airport = {},
	} = primary_service;

	const handleLocationDetails = (location) => {
		const { port_code, postal_code, country, display_name, name } = location || {};
		return (
			<>
				<div className={styles.port_code}>
					<div className={styles.code}>
						(
						{port_code || postal_code}
						)
					</div>

					<div className={`${styles.country}`}>
						{country?.name}
					</div>
				</div>

				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{display_name}</div>
						</div>
					)}
				>
					<div className={styles.value}>{name}</div>
				</Tooltip>
			</>
		);
	};

	return (
		<>
			<div className={styles.origin_details}>
				{handleLocationDetails(origin_airport)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.destination_details}>
				{handleLocationDetails(destination_airport)}
			</div>
		</>
	);
}

export default RenderLocation;
