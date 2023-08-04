import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTimer, IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const useGetAttendanceColumns = () => {
	const columns = [
		{
			Header   : <div className={styles.header_text}>DAY</div>,
			accessor : (item) => formatDate({
				date       : new Date(item.date),
				dateFormat : GLOBAL_CONSTANTS.formats.date['EEE, dd'],
				formatType : 'date',
			}),
			id: 'day',
		},
		{
			Header   : <div className={styles.header_text}>CHECK IN</div>,
			accessor : (item) => formatDate({
				date       : item.checkin,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			}),
			id: 'check_in',
		},
		{
			Header   : '',
			accessor : () => (
				<div className={styles.flex}>
					<div className={styles.dot} />
					<div className={styles.separator}>
						<div className={styles.title_text}>
							Next section
						</div>
					</div>
					<div className={styles.right_dot} />
				</div>
			),
			id: 'data_visualization',
		},
		{
			Header   : <div className={styles.header_text}>CHECK OUT</div>,
			accessor : (item) => formatDate({
				date       : item.checkout,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			}),
			id: 'check_out',
		},

		{
			Header   : <div className={styles.header_text}>TOTAL HRS</div>,
			accessor : (item) => (
				<div className={styles.total_hrs_flex}>
					{item.total_hrs}
					<span className={styles.extra_hrs}>
						+
						{item.extra_hrs}
					</span>
				</div>
			),
			id: 'total_hrs',
		},
		{
			Header   : <div className={styles.header_text}>ACTIONS</div>,
			accessor : () => (
				<div className={styles.action_flex}>
					<IcMTimer className={`${styles.cursor_pointer} ${styles.timer_icon}`} width={25} height={25} />
					<IcMPlus className={styles.cursor_pointer} width={25} height={25} />
				</div>
			),
			id: 'actions',
		},
	];

	return columns;
};

export default useGetAttendanceColumns;
