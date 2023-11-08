import { Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCCheckIn, IcCCheckOut, IcMArrowRight } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import Loader from '../../../../../common/Loader';
import useGetCheckinStats from '../../../../../hooks/useGetCheckinStats';
import { getCurrentLocation } from '../../../../../hooks/useGetCurrentLocation';
import useUpdateAttendance from '../../../../../hooks/useUpdateAttendance';

import CurrentTime from './CurrentTime';
import styles from './styles.module.css';

function TimeSummary() {
	const [coords, setCoords] = useState(null);
	const { data, loading, refetch } = useGetCheckinStats();

	const getTime = (date, isDate = false) => {
		if (!date) {
			return '--';
		}

		return formatDate({
			date,
			dateFormat : isDate ? GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'] : undefined,
			timeFormat : !isDate ? GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'] : undefined,
			formatType : isDate ? 'date' : 'time',
		});
	};

	const { check_in, check_out, enable_check_out } = data || {};
	const { loading : updateLoading, updateAttendance } = useUpdateAttendance({ check_in, refetch });

	useEffect(() => {
		getCurrentLocation()
			.then((location) => {
				setCoords(location);
			})
			.catch((error) => {
				console.error('Error getting location:', error);
				Toast.error('Please Enable Location');
			});
	}, []);
	const handleCheckOut = () => {
		const { latitude, longitude } = coords || {};
		const dataObj = {
			lat  : latitude,
			long : longitude,
		};
		updateAttendance(dataObj);
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader height="20px" count={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.current_time}>
				<CurrentTime />
			</div>
			<div className={styles.today_date}>
				{getTime(Date(), true)}
			</div>
			<div className={styles.time_log_flex}>
				<div className={styles.time_log}>
					<IcCCheckIn width={20} height={20} style={{ marginRight: 8 }} />
					{getTime(check_in)}
				</div>
				<div className={styles.time_log} style={{ marginLeft: 24 }}>
					<IcCCheckOut width={20} height={20} style={{ marginRight: 8 }} />
					{getTime(check_out)}
				</div>
			</div>
			<div className={styles.checkout}>
				<Button
					themeType="accent"
					size="lg"
					disabled={!enable_check_out || updateLoading}
					onClick={enable_check_out ? handleCheckOut : () => {}}

				>
					Check
					{' '}
					{check_in ? 'Out' : 'In'}
					<IcMArrowRight style={{ marginLeft: '2px' }} />
				</Button>
			</div>
		</div>
	);
}

export default TimeSummary;
