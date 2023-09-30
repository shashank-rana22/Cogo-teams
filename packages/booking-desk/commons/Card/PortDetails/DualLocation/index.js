import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import ServiceIcon from '../../ServiceIcon';
import HandleLocationDetails from '../HandleLocationDetails';

import styles from './styles.module.css';

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

function PortDetails({ data = {}, icon = {} }) {
	const {
		origin = {},
		destination = {},
		schedule_arrival = '',
		schedule_departure = '',
	} = data || {};

	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>
			<ServiceIcon {...icon} />

			<div className={styles.port_detail}>

				<HandleLocationDetails location={origin} />

				{schedule_departure ? (
					<div className={styles.eta_etd}>
						ETD:
						{' '}
						{getDisplayDate(schedule_departure)}
					</div>
				) : 'TBD'}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.port_detail}>

				<HandleLocationDetails location={destination} />

				{schedule_arrival ? (
					<div className={styles.eta_etd}>
						ETA:
						{' '}
						{getDisplayDate(schedule_arrival)}
					</div>
				) : 'TBD'}
			</div>
		</div>
	);
}

export default PortDetails;
