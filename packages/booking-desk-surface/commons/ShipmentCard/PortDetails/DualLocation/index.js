import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import getLocation from '../../../../utils/getLocation';

import styles from './styles.module.css';

const handleLocationDetails = (location = {}) => (
	<>
		<div className={styles.port_code}>
			<div className={`${styles.code} core_ui_port_code`}>
				(
				{location?.port_code || location?.postal_code}
				)
			</div>

			<div className={`${styles.country} core_ui_country_code`}>
				{location?.country_code}
			</div>
		</div>

		<Tooltip
			placement="bottom"
			theme="light"
			interactive
			content={location?.display_name}
		>
			<div className={`${styles.ellipsis_text} core_ui_loaction_name`}>{location?.name}</div>
		</Tooltip>
	</>
);

function PortDetails({ data = {} }) {
	const { origin, destination } = getLocation({ data });

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<div className={styles.port_detail}>
				{handleLocationDetails(origin)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.port_detail}>
				{handleLocationDetails(destination)}
			</div>
		</div>
	);
}

export default PortDetails;
