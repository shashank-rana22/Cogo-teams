import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetCycles from '../../hooks/useGetCycles';

import AttendanceStats from './AttedanceStats';
import AttendanceLogs from './AttendanceLogs';
import ChecInCheckOut from './CheckInCheckOut';
import Header from './Header';
import styles from './styles.module.css';

function AttendanceComponent({ data, loading : statsLoading, coords, refetch }) {
	const [selectMonth, setSelectMonth] = useState('');
	const { loading, formattedData } = useGetCycles();

	useEffect(() => {
		if (!isEmpty(formattedData)) {
			const [firstData] = formattedData || [];

			setSelectMonth({
				month : firstData.label.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
				value : firstData.value,
			});
		}
	}, [formattedData]);

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
					<ChecInCheckOut data={data} loading={statsLoading} coords={coords} refetch={refetch} />
				</div>

				<div className={styles.attendance_stats}>
					<AttendanceStats selectMonth={selectMonth} />
				</div>
			</div>
			<div className={styles.container}>
				<AttendanceLogs formattedData={formattedData} selectMonth={selectMonth} />
			</div>
		</div>
	);
}

export default AttendanceComponent;
