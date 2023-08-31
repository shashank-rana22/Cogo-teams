import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import useGetCycles from '../../hooks/useGetCycles';
import useGetEmployeeLeaveBalances from '../../hooks/useGetEmployeeLeaveBalances';

import Header from './Header';
import LeaveBalancesComponent from './LeaveBalancesComponent';
import LeaveRequestListing from './LeaveRequestListing';
import LeaveStatsApplicationsComponent from './LeaveStatsApplicationsComponent';
import styles from './styles.module.css';

function LeavesManagement() {
	const [selectedMonth, setSelectedMonth] = useState('');
	const { loading, formattedData } = useGetCycles();

	const { data, refetch, loading : balanceLoading } = useGetEmployeeLeaveBalances({ value: selectedMonth?.value });

	useEffect(() => {
		if (!isEmpty(formattedData)) {
			const [firstData] = formattedData || [];

			setSelectedMonth({
				month : firstData.label.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
				value : firstData.value,
			});
		}
	}, [formattedData]);

	const leaveRequestsRef = useRef(null);
	const executeScroll = () => leaveRequestsRef.current.scrollIntoView({
		behavior : 'smooth',
		block    : 'start',
	});

	return (
		<div className={styles.container}>
			<Header
				formattedData={formattedData}
				selectedMonth={selectedMonth}
				loading={loading}
				setSelectedMonth={setSelectedMonth}
			/>
			<div className={styles.body_container}>
				<div className={styles.leave_balance_style}>
					<LeaveBalancesComponent data={data} refetch={refetch} loading={balanceLoading} />
				</div>
				<div className={styles.leave_stats_style}>
					<LeaveStatsApplicationsComponent selectedMonth={selectedMonth} executeScroll={executeScroll} />
				</div>
			</div>
			<div>
				<LeaveRequestListing leaveData={data} refetchLeaves={refetch} leaveRequestsRef={leaveRequestsRef} />
			</div>
		</div>
	);
}

export default LeavesManagement;
