import { cl, Tooltip } from '@cogoport/components';
import { IcMCfs } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	const {
		port_id,
	} = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const handleLocationDetails = (location) => (
		<>
			<div className={styles.port_code}>
				<div className={` ${styles.code}`}>
					(
					{location?.port_code || location?.postal_code}
					)
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
			{handleLocationDetails(port_id)}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcMCfs />
				<span>FCL Cfs</span>
			</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
