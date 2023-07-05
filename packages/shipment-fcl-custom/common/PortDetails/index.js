import { cl, Tooltip } from '@cogoport/components';
import { IcMCustoms } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ primary_service = {} }) {
	const {

		port = {},
	} = primary_service;

	const handleLocationDetails = (location) => (
		<>
			<div className={styles.port_code}>
				<div className={` ${styles.code}`}>
					(
					{location?.port_code || location?.postal_code}
					)
				</div>

				<div className={`${styles.country}`}>
					{location?.country?.name}
				</div>
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div>
						<div style={{ fontSize: '10px' }}>{location?.display_name}</div>

					</div>
				)}
			>
				<div className={cl`${styles.value}`}>{location?.name}</div>
			</Tooltip>

		</>
	);

	const renderLocation = () => (

		<div className={styles.flex_row_origin}>
			{handleLocationDetails(port)}

		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcMCustoms />
				<span>FCL Customs</span>
			</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
