import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Summary from '../Summary';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import styles from './styles.module.css';
import Timesheet from './Timesheet';

function AttendanceLogs({
	formattedData = [], selectedMonth = {}, setSelectedMonth = () => {},
	data = {}, loading = false,
}) {
	const { month, value } = selectedMonth;
	const [openTimesheet, setOpenTimesheet] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');

	const handleMonthChange = (item, val) => {
		setSelectedMonth({
			month : val?.label.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
			value : item,
		});
	};

	const handleOpenModal = (date) => {
		setSelectedDate(date);
		setOpenTimesheet(true);
	};

	const handleOnClose = () => {
		setSelectedDate('');
		setOpenTimesheet(false);
	};

	return (
		<>
			<div>
				<div className={styles.header_container}>
					<div>
						<div className={styles.title}>
							ATTENDANCE LOGS
						</div>
						<div className={styles.sub_title}>
							Logs for the month of
							{' '}
							{startCase(selectedMonth?.month || month)}
						</div>
					</div>
					<div className={styles.select_wrapper}>
						<Select
							placeholder="Select Month"
							options={formattedData}
							onChange={(item, val) => handleMonthChange(item, val)}
							value={selectedMonth?.value || value}
						/>
					</div>
				</div>
				<div className={styles.table_container}>
					<DesktopView dataArr={data} loading={loading} handleOpenModal={handleOpenModal} />
				</div>
				<div className={styles.mobile_view}>
					<MobileView data={data} loading={loading} handleOpenModal={handleOpenModal} />
				</div>
			</div>
			<Summary cycle={value} />
			{openTimesheet && (
				<Timesheet
					show={openTimesheet}
					onClose={handleOnClose}
					selectedDate={selectedDate}
				/>
			)}
		</>
	);
}

export default AttendanceLogs;
