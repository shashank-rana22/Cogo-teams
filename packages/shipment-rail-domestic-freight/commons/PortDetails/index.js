import { Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcCFhaulage } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	const {
		origin_location = {},
		destination_location = {},
	} = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const handleLocationDetails = (location) => (
		<>
			<div className={styles.port_code}>
				<div className={` ${styles.code}`}>
					{`(${location?.postal_code})`}
				</div>

				<div className={`${styles.country}`}>
					{location?.country?.name}
				</div>
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div className={styles.location_tooltip}>
						{location?.display_name}
					</div>
				)}
			>
				<div className={styles.value}>{location?.name}</div>
			</Tooltip>

		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcCFhaulage />
				<span>RAIL</span>
			</div>

			<div className={styles.flex_row_origin}>
				{handleLocationDetails(origin_location)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.flex_row_destination}>
				{handleLocationDetails(destination_location)}
			</div>
		</div>
	);
}

export default PortDetails;
