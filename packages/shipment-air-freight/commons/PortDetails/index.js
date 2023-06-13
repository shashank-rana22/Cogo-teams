import { Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcMFair } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	const {
		origin_airport = {},
		destination_airport = {},
	} = primary_service;

	if (isEmpty(data)) { return null; }

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

	const renderLocation = () => (
		<>
			<div className={styles.flex_row_origin}>
				{handleLocationDetails(origin_airport)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.flex_row_destination}>
				{handleLocationDetails(destination_airport)}
			</div>
		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcMFair />
				<span>AIR</span>
			</div>

			{renderLocation()}
		</div>
	);
}

export default PortDetails;
