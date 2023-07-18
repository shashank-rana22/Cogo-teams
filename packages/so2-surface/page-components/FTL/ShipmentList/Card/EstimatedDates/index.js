import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const getDisplayDate = (date) => (date ? formatDate({
	date,
	dateFormat:
			GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType: 'date',
}) : null);

const getDisplayDateTime = (date) => (date ? formatDate({
	date,
	dateFormat:
			GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
	formatType : 'dateTime',
	separator  : ' ',
}) : null);

function EstimatedDates({ data = {} }) {
	const {
		estimated_arrival = '',
		estimated_departure = '',
		pickup_date = '',
		delivery_date = '',
	} =	 data.ftl_freight_services?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ETD :
					</div>
					{estimated_departure ? (
						<div className={styles.eta_etd}>
							<Tooltip
								placement="bottom"
								theme="light"
								content={getDisplayDateTime(estimated_departure)}
							>
								{getDisplayDate(estimated_departure)}
							</Tooltip>
						</div>
					) : 'TBD'}
				</div>

				<div className={styles.icon_wrapper}>
					<IcMPortArrow />
				</div>
				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ETA :
					</div>
					{estimated_arrival ? (

						<div className={styles.eta_etd}>
							<Tooltip
								placement="bottom"
								theme="light"
								content={getDisplayDateTime(estimated_arrival)}
							>
								{getDisplayDate(estimated_arrival)}
							</Tooltip>

						</div>

					) : 'TBD'}
				</div>
			</div>
			<div className={styles.container}>

				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ATD :
					</div>
					{pickup_date ? (
						<div className={styles.eta_etd}>
							<Tooltip
								placement="bottom"
								theme="light"
								content={getDisplayDateTime(pickup_date)}
							>
								{getDisplayDate(pickup_date)}
							</Tooltip>
						</div>
					) : 'TBD'}
				</div>

				<div className={styles.icon_wrapper}>
					<IcMPortArrow />
				</div>
				<div className={styles.date_detail}>
					<div className={styles.heading}>
						ATA :
					</div>
					{delivery_date ? (

						<div className={styles.eta_etd}>
							<Tooltip
								placement="bottom"
								theme="light"
								content={getDisplayDateTime(delivery_date)}
							>
								{getDisplayDate(delivery_date)}
							</Tooltip>

						</div>

					) : 'TBD'}
				</div>
			</div>
		</div>
	);
}

export default EstimatedDates;
