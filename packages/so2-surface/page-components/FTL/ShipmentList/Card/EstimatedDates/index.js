import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIRST_ELEMENT_DATA = 0;

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

function EstimatedDates({ data = {} }) {
	const {
		estimated_arrival = '',
		estimated_departure = '',
		pickup_date = '',
		delivery_date = '',
	} =	 data.ftl_freight_services[FIRST_ELEMENT_DATA] || {};
	return (
		<div>
			<div className={`${styles.container} core_ui_port_conatiner`}>

				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ETD:
					</div>
					{estimated_departure ? (
						<div className={styles.eta_etd}>
							{' '}
							{getDisplayDate(estimated_departure)}
						</div>

					) : 'TBD'}
				</div>

				<div className={styles.icon_wrapper}>
					<IcMPortArrow className="core_ui_icon" />
				</div>
				<div className={styles.heading}>
					ETA:
				</div>
				{estimated_arrival ? (

					<div className={styles.date_detail}>

						<div className={styles.eta_etd}>
							{'  '}
							{getDisplayDate(estimated_arrival)}

						</div>
					</div>

				) : 'TBD'}
			</div>
			<div className={`${styles.container} core_ui_port_conatiner`}>

				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ATD:
					</div>
					{pickup_date ? (
						<div className={styles.eta_etd}>
							{getDisplayDate(pickup_date)}
						</div>
					) : 'TBD'}
				</div>

				<div className={styles.icon_wrapper}>
					<IcMPortArrow className="core_ui_icon" />
				</div>
				<div className={styles.heading}>
					ATA:
				</div>
				{delivery_date ? (

					<div className={styles.date_detail}>

						<div className={styles.eta_etd}>
							{'  '}
							{getDisplayDate(delivery_date)}

						</div>
					</div>

				) : 'TBD'}
			</div>
		</div>
	);
}

export default EstimatedDates;
