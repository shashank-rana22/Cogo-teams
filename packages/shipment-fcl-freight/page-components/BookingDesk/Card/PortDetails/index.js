import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';
import { format } from '@cogoport/utils';
import { getServiceIcon } from '../../utils/getServiceIcon';

import styles from './styles.module.css';

const handleLocationDetails = (location) => {
	return <>
		<div className={styles.port_code}>
			<div className={`${styles.code} core_ui_port_code`}>
				({location?.port_code || location?.postal_code})
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
}

const getDisplayDate = (date, dateFormat= 'dd MMM yyyy') => {
	return date ? format(date, dateFormat, null, true) : null;
}

function PortDetails({ data = {} }) {
	const { origin, destination, schedule_arrival, schedule_departure } = data;

	const { serviceIcon } = getServiceIcon();

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			{serviceIcon}

			<div className={styles.port_detail}>
				{handleLocationDetails(origin)}
				{schedule_departure ? (
					<div className={styles.eta_etd} >ETD: {getDisplayDate(schedule_departure)}</div>
				): 'TBD'}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.port_detail}>
				{handleLocationDetails(destination)}
				{schedule_arrival ? (
					<div className={styles.eta_etd} >ETA: {getDisplayDate(schedule_arrival)}</div>
				): 'TBD'}
			</div>
		</div>
	);
}

export default PortDetails;
