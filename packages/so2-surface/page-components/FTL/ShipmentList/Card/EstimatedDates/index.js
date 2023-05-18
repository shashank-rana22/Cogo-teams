import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';
import styles from './styles.module.css';

const getDisplayDate = (date, dateFormat = 'dd MMM yyyy') => (date ? format(date, dateFormat, null, true) : null);

function EstimatedDates({ data = {} }) {
	const { estimated_arrival = '', estimated_departure = '' } = data.ftl_freight_services[0] || {};
	return (
		<div className={`${styles.container} core_ui_port_conatiner`}>

			<div className={styles.date_detail}>
				{estimated_departure ? (
					<>
						<div className={styles.heading}>
							ETD:
						</div>

						<div className={styles.eta_etd}>
							{' '}
							{getDisplayDate(estimated_departure)}
						</div>
					</>
				) : 'TBD'}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>
			{estimated_arrival ? (

				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ETA:
					</div>
					<div className={styles.eta_etd}>
						{'  '}
						{getDisplayDate(estimated_arrival)}

					</div>
				</div>

			) : 'TBD'}
		</div>
	);
}

export default EstimatedDates;
