import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTimer, IcMPlus } from '@cogoport/icons-react';
import React from 'react';

import { ATTENDANCE_LOGS_STATUS_MAPPING } from '../../utils/constants';

import styles from './styles.module.css';

const GREEN_DOT = ['present', 'holiday', 'sick_leave', 'privilege_leave',
	'casual_leave', 'half_day_sick_leave', 'half_day_privilege_leave', 'half_day_casual_leave'];

const RED_DOT = ['absent', 'half_day_absent', 'leave_without_pay'];

const GRAY_DOT = ['invalid'];

const ORANGE_DOT = ['weekly_off'];

const useGetAttendanceColumns = ({ normal_shift, weekend_shift }) => {
	const getTimings = (shift_timings) => {
		const { start_time, end_time } = shift_timings || {};

		return `${formatDate({
			date       : start_time,
			dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'time',
		})} - ${formatDate({
			date       : end_time,
			dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'time',
		})}`;
	};

	const getLeftDotColor = (val) => {
		if (ORANGE_DOT.includes(val)) {
			return 'color_orange';
		}

		if (RED_DOT.includes(val)) {
			return 'color_red';
		}

		if (GRAY_DOT.includes(val)) {
			return 'color_grey';
		}

		return 'color_green';
	};

	const getRightDotColor = (val) => {
		const greenDot = [...GREEN_DOT, 'half_day_absent'];

		if (ORANGE_DOT.includes(val)) {
			return 'color_orange';
		}

		if (GRAY_DOT.includes(val)) {
			return 'color_grey';
		}

		if (greenDot.includes(val)) {
			return 'color_green';
		}

		return 'color_red';
	};

	const getSeparatorColor = (val) => {
		if (val === 'half_day_absent') {
			return styles.hda;
		}

		if (GREEN_DOT.includes(val)) {
			return styles.separator;
		}

		if (ORANGE_DOT.includes(val)) {
			return styles.orange_separator;
		}

		if (RED_DOT.includes(val)) {
			return styles.red_separator;
		}

		return styles.invalid;
	};

	const getBorderColor = (val) => {
		if (val === 'half_day_absent') {
			return 'hda_border';
		}

		if (GREEN_DOT.includes(val)) {
			return 'border_green';
		}

		if (ORANGE_DOT.includes(val)) {
			return 'border_orange';
		}

		if (RED_DOT.includes(val)) {
			return 'border_red';
		}

		return 'border_grey';
	};

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
				date       : item.check_in,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			}),
			id: 'check_in',
		},
		{
			Header   : '',
			accessor : (item) => (
				<div className={styles.flex}>
					<div className={cl`${styles.dot} ${styles[getLeftDotColor(item.day_status)]}`} />
					<div className={getSeparatorColor(item.day_status)}>
						<div className={cl`${styles.title_text} ${styles[getBorderColor(item.day_status)]}`}>
							{ATTENDANCE_LOGS_STATUS_MAPPING[item.day_status]}
						</div>
					</div>
					<div className={cl`${styles.right_dot} ${styles[getRightDotColor(item.day_status)]}`} />
				</div>
			),
			id: 'data_visualization',
		},
		{
			Header   : <div className={styles.header_text}>CHECK OUT</div>,
			accessor : (item) => formatDate({
				date       : item.check_out,
				dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
				formatType : 'time',
			}),
			id: 'check_out',
		},
		{
			Header   : <div className={styles.header_text}>TOTAL HRS</div>,
			accessor : (item) => (
				<div className={styles.total_hrs}>
					{item.total_hrs}
					{' '}
					Hrs
				</div>
			),
			id: 'total_hrs',
		},
		{
			Header   : <div className={styles.header_text}>SHIFT TIMINGS</div>,
			accessor : (item) => (
				<div>
					{getTimings(item.day === 'Saturday' ? weekend_shift : normal_shift)}
				</div>
			),
			id: 'shift_timings',
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
