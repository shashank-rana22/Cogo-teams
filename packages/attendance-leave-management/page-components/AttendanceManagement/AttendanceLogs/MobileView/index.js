import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React from 'react';

import {
	ATTENDANCE_LOGS_STATUS_MAPPING, GREEN_STATUS, INVALID_STATUS,
	HALF_DAY_STATUS, WEEKLY_OFF,
} from '../../../../utils/constants';

import styles from './styles.module.css';

const SKELETON_COUNT = 5;

function MobileView({ data = {}, loading = false, handleOpenModal = () => {} }) {
	const { details } = data || {};

	const getClassName = (status, color) => {
		if (GREEN_STATUS.includes(status)) {
			return color ? 'present_color' : 'present';
		}

		if (INVALID_STATUS.includes(status)) {
			return color ? 'invalid_color' : 'invalid';
		}

		if (HALF_DAY_STATUS.includes(status)) {
			return color ? 'present_color' : 'hda';
		}

		if (WEEKLY_OFF.includes(status)) {
			return color ? 'weekly_off_color' : 'weekly_off';
		}

		return color ? 'absent_color' : 'absent';
	};

	if (loading) {
		return [...Array(SKELETON_COUNT).keys()].map((val) => (
			<div className={styles.card} key={val}>
				<Placeholder height="50px" width="324px" margin="0px 0px 20px 0px" />
			</div>
		));
	}

	return (
		<div>
			{(details || [])?.map((val) => (
				<div
					className={styles.card}
					key={val?.date}
					onClick={() => handleOpenModal(val?.date)}
					aria-hidden
				>
					<div className={styles.attendance_date}>
						<div className={styles.attendance_day}>
							{formatDate({
								date       : val?.date,
								dateFormat : GLOBAL_CONSTANTS.formats.date.EEEE,
								formatType : 'date',
							})}
						</div>
						{formatDate({
							date       : val?.date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, dd'],
							formatType : 'date',
						})}
					</div>
					<div className={styles.attendance_time}>
						<div className={styles.attendance_day}>
							Check in & out
						</div>
						{formatDate({
							date       : val?.check_in,
							dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'time',
						})}
						{' '}
						-
						{' '}
						{formatDate({
							date       : val?.check_out,
							dateFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'time',
						})}
					</div>
					<div className={cl`${styles.attendance_status} ${styles[getClassName(val?.day_status, true)]}`}>
						<div className={cl`${styles.attendance_dot} ${styles[getClassName(val?.day_status)]}`} />
						{ATTENDANCE_LOGS_STATUS_MAPPING[val?.day_status]?.label}
					</div>
				</div>
			))}
		</div>
	);
}

export default MobileView;
