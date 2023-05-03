import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import ServiceIcon from '../../ServiceIcon';

import styles from './styles.module.css';

const handleLocationDetails = (location) => (
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

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

function PortDetails({ data = {}, icon }) {
	const { destination_port = {}, origin_port = {}, estimated_arrival = '', estimated_departure = '' } = data;

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<ServiceIcon {...icon} />

			<div className={styles.port_detail}>
				{handleLocationDetails(origin_port)}
				{estimated_departure ? (
					<div className={styles.eta_etd}>
						ETD:
						{' '}
						{getDisplayDate(estimated_departure)}
					</div>
				) : 'TBD'}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.port_detail}>
				{handleLocationDetails(destination_port)}
				{estimated_arrival ? (
					<div className={styles.eta_etd}>
						ETA:
						{' '}
						{getDisplayDate(estimated_arrival)}
					</div>
				) : 'TBD'}
			</div>
		</div>
	);
}

export default PortDetails;
