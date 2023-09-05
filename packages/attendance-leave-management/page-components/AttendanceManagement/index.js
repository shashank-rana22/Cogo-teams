import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import useGetAttendanceLogs from '../../hooks/useGetAttendanceLogs';
import useGetCycles from '../../hooks/useGetCycles';

import AttendanceStats from './AttedanceStats';
import AttendanceLogs from './AttendanceLogs';
import ChecInCheckOut from './CheckInCheckOut';
import Header from './Header';
import styles from './styles.module.css';

function AttendanceComponent({ data = {}, loading : statsLoading = false, coords = {}, refetch = () => {} }) {
	const [selectMonth, setSelectMonth] = useState('');
	const [selectedMonthLogs, setSelectedMonthLogs] = useState('');
	const { loading, formattedData } = useGetCycles();

	const { data : logsData, loading : logsLoading, refetchLogs } = useGetAttendanceLogs(selectedMonthLogs?.value);

	useEffect(() => {
		if (!isEmpty(formattedData)) {
			const [firstData] = formattedData || [];
			const firstValue = firstData?.label?.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index];

			setSelectMonth({
				month : firstValue,
				value : firstData?.value,
			});
			setSelectedMonthLogs({
				month : firstValue,
				value : firstData?.value,
			});
		}
	}, [formattedData]);

	const attendanceLogsRef = useRef(null);

	const executeScroll = () => attendanceLogsRef.current.scrollIntoView({
		behavior : 'smooth',
		block    : 'start',
	});

	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<Header
					selectMonth={selectMonth}
					setSelectMonth={setSelectMonth}
					formattedData={formattedData}
					loading={loading}
				/>
			</div>

			<div className={styles.body_container}>
				<div className={styles.check_in_style}>
					<ChecInCheckOut
						data={data}
						loading={statsLoading}
						coords={coords}
						refetch={refetch}
						refetchLogs={refetchLogs}
					/>
				</div>

				<div className={styles.attendance_stats}>
					<AttendanceStats
						selectMonth={selectMonth}
						executeScroll={executeScroll}
					/>
				</div>
			</div>
			<div className={styles.container} ref={attendanceLogsRef}>
				<AttendanceLogs
					formattedData={formattedData}
					selectedMonth={selectedMonthLogs}
					setSelectedMonth={setSelectedMonthLogs}
					data={logsData}
					loading={logsLoading}
				/>
			</div>
		</div>
	);
}

export default AttendanceComponent;
