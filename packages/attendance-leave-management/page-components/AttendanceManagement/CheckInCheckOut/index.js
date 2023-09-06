import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCCheckOut, IcCCheckIn } from '@cogoport/icons-react';

import useGetCurrentTime from '../../../hooks/useGetCurrentTime';
import useGetUpdateAttendance from '../../../hooks/useGetUpdateAttendance';

import CompletedTime from './CompletedTime';
import styles from './styles.module.css';

function ChecInCheckOut({
	data = {}, loading = false, coords = {},
	refetch = () => {}, refetchLogs = () => {},
}) {
	const formatToday = formatDate({
		date       : new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
		formatType : 'date',
	});

	const getTime = (date) => {
		if (!date) {
			return '--';
		}

		return formatDate({
			date,
			timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss aaa'],
			formatType : 'time',
		});
	};

	const { check_in, check_out, enable_check_out } = data || {};

	const { loading : updateLoading, updateAttendance } = useGetUpdateAttendance({ check_in, refetch, refetchLogs });

	const handleCheckOut = () => {
		const { latitude, longitude } = coords || {};
		const dataObj = {
			lat  : latitude,
			long : longitude,
		};
		updateAttendance(dataObj);
	};

	return (
		<div>
			<div className={styles.header}>
				TODAY,
				{' '}
				{formatToday}
			</div>

			<div className={styles.sub_header}>
				This is your status for the day
			</div>

			<div className={styles.time_container}>
				<div className={styles.arrow_time_wrapper}>
					<div>
						<IcCCheckIn width={25} height={25} />
					</div>

					<div className={styles.time_wrapper}>
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" /> : getTime(check_in)}
					</div>
				</div>

				<div className={styles.arrow_time_wrapper}>
					<div>
						<IcCCheckOut width={25} height={25} />
					</div>

					<div className={styles.time_wrapper_out}>
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" />
							: getTime(check_out) }
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20 }}>
					<div>
						<div style={{ color: '#4F4F4F', paddingBottom: 2 }}>
							Current Time
						</div>
						<div className={styles.formatted_time}>
							{useGetCurrentTime()}
						</div>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
						<div style={{ color: '#4F4F4F', paddingBottom: 2 }}>
							Completed Time
						</div>
						{loading
							? <Placeholder height="50px" width="100px" margin="0px 0px 20px 0px" />
							: <CompletedTime checkInTimeStr={check_in} checkOutTimeStr={check_out} />}
					</div>
				</div>

				<div className={styles.button_wrapper}>
					<Button
						themeType="accent"
						size="lg"
						disabled={!enable_check_out || updateLoading}
						onClick={enable_check_out ? handleCheckOut : () => {}}
					>
						Check
						{' '}
						{check_in ? 'Out' : 'In'}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChecInCheckOut;
