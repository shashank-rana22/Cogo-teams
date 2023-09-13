import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMTimer } from '@cogoport/icons-react';
import React from 'react';

import {
	ATTENDANCE_LOGS_STATUS_MAPPING, GREEN_STATUS, INVALID_STATUS, RED_DOT,
	SEPARATOR_CONDITION, WEEKLY_OFF,
} from '../../utils/constants';

import styles from './styles.module.css';

const useGetAttendanceColumns = ({ normal_shift, weekend_shift, handleOpenModal }) => {
	const getTimings = (shift_timings) => {
		const { start_time, end_time } = shift_timings || {};

		return `${formatDate({
			date       : new Date(start_time),
			dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'time',
		})} - ${formatDate({
			date       : new Date(end_time),
			dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
			formatType : 'time',
		})}`;
	};

	const getLeftDotColor = (val) => {
		if (WEEKLY_OFF.includes(val)) {
			return 'color_orange';
		}

		if (RED_DOT.includes(val)) {
			return 'color_red';
		}

		if (INVALID_STATUS.includes(val)) {
			return 'color_grey';
		}

		return 'color_green';
	};

	const getRightDotColor = (val) => {
		const greenDot = [...GREEN_STATUS, ...SEPARATOR_CONDITION];

		if (WEEKLY_OFF.includes(val)) {
			return 'color_orange';
		}

		if (INVALID_STATUS.includes(val)) {
			return 'color_grey';
		}

		if (greenDot.includes(val)) {
			return 'color_green';
		}

		return 'color_red';
	};

	const getSeparatorColor = (val) => {
		if (SEPARATOR_CONDITION.includes(val)) {
			return styles.hda;
		}

		if (GREEN_STATUS.includes(val)) {
			return styles.separator;
		}

		if (WEEKLY_OFF.includes(val)) {
			return styles.orange_separator;
		}

		if (RED_DOT.includes(val)) {
			return styles.red_separator;
		}

		return styles.invalid;
	};

	const getBorderColor = (val) => {
		if (SEPARATOR_CONDITION.includes(val)) {
			return 'hda_border';
		}

		if (GREEN_STATUS.includes(val)) {
			return 'border_green';
		}

		if (WEEKLY_OFF.includes(val)) {
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
			accessor : (item) => (
				<div style={{ fontWeight: 400 }}>
					{item.check_in ? formatDate({
						date       : new Date(item.check_in),
						dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'time',
					}) : '--'}
				</div>
			),
			id: 'check_in',
		},
		{
			Header   : '',
			accessor : (item) => (
				<div className={styles.flex}>
					<div className={cl`${styles.dot} ${styles.mr_8} ${styles[getLeftDotColor(item.day_status)]}`} />
					<div className={getSeparatorColor(item.day_status)}>
						<div className={cl`${styles.title_text} ${styles[getBorderColor(item.day_status)]}`}>
							{ATTENDANCE_LOGS_STATUS_MAPPING[item.day_status]?.label}
						</div>
					</div>
					<div className={cl`${styles.right_dot}
					${styles.ml_8} ${styles[getRightDotColor(item.day_status)]}`}
					/>
				</div>
			),
			id: 'data_visualization',
		},
		{
			Header   : <div className={styles.header_text}>CHECK OUT</div>,
			accessor : (item) => (
				<div style={{ fontWeight: 400 }}>
					{item.check_out ? formatDate({
						date       : item.check_out,
						dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'time',
					}) : '--'}
				</div>
			),
			id: 'check_out',
		},
		{
			Header   : <div className={styles.header_text}>TOTAL HRS</div>,
			accessor : (item) => (
				<div className={styles.total_hrs}>
					{item.total_hrs}
					{' '}
					{item.total_hrs ? 'Hrs' : '--'}
				</div>
			),
			id: 'total_hrs',
		},
		{
			Header   : <div className={styles.header_text}>SHIFT TIMINGS</div>,
			accessor : (item) => (
				<div style={{ fontWeight: 400 }}>
					{getTimings(item.day === 'Saturday' ? weekend_shift : normal_shift)}
				</div>
			),
			id: 'shift_timings',
		},
		{
			Header   : <div className={styles.header_text}>ACTIONS</div>,
			accessor : (item) => (
				<div className={styles.action_flex}>
					<IcMTimer
						className={cl`${styles.cursor_pointer} ${styles.timer_icon}`}
						width={20}
						height={20}
						onClick={() => handleOpenModal(item.date)}
					/>
				</div>
			),
			id: 'actions',
		},
	];

	return columns;
};

export default useGetAttendanceColumns;
