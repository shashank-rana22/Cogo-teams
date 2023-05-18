import React from 'react';
import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import ServiceIcon from '../ServiceIcon';
import styles from './styles.module.css';

const handleLocationDetails = (location) => (
	<>
		<div className={styles.location_code}>
			<div className={`${styles.code} core_ui_port_code`}>
				(
				{location?.postal_code}
				)
			</div>
		</div>

		<Tooltip
			placement="bottom"
			theme="light"
			interactive
			content={location?.display_name}
		>
			<div className={`${styles.ellipsis_text} core_ui_location_name`}>{location?.name}</div>
		</Tooltip>
	</>
);

function LocationDetails({ data = {}, icon }) {
	const { destination_location = {}, origin_location = {} } = data;
	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<ServiceIcon {...icon} />

			<div className={styles.location_detail}>
				{handleLocationDetails(origin_location)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.location_detail}>
				{handleLocationDetails(destination_location)}
			</div>
		</div>
	);
}

export default LocationDetails;
