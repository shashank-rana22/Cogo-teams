import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import ServiceIcon from '../ServiceIcon';

import styles from './styles.module.css';

const handleLocationDetails = (location) => (
	<>
		<div className={styles.port_code}>
			<div className={styles.code}>
				(
				{location?.port_code || location?.postal_code}
				)
			</div>

			<div className={styles.country}>
				{location?.country_code}
			</div>
		</div>

		<Tooltip
			placement="bottom"
			theme="light"
			interactive
			content={location?.display_name}
		>
			<div className={styles.ellipsis_text}>{location?.name}</div>
		</Tooltip>
	</>
);

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

function PortDetails({ data = {}, icon = {} }) {
	const { origin_port, destination_port, estimated_arrival, estimated_departure } = data;

	return (
		<div className={styles.container}>
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
				<IcMPortArrow />
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
