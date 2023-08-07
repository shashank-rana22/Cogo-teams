import { Button, Select, Input, ButtonIcon } from '@cogoport/components';
import { IcMDownload, IcMProfile, IcMAppSearch } from '@cogoport/icons-react';
import React from 'react';

// import StyledTable from '../../common/StyledTable';

import AttendanceData from './AttendanceData';
import styles from './styles.module.css';

const options = [
	{ label: 'Jan 2023', value: 'jan_2023' },
	{ label: 'Feb 2023', value: 'Feb_2023' },
	{ label: 'March 2023', value: 'march_2023' },
];

function TeamAttendance() {
	return (
		<>
			<div className={styles.header_container}>
				<h3 className={styles.heading}>Team Attendance</h3>
				<div className={styles.header_container_flex}>
					<div className={styles.select_container}>
						<Select
						// value={monthWise}
						// onChange={setMonthWise}
							placeholder="Select Month"
							options={options}
							size="md"
						/>
					</div>
					<Button themeType="secondary" size="lg">
						<span style={{ paddingRight: 10 }}>
							Download Report
						</span>
						<IcMDownload />
					</Button>
					<Input
						className={styles.input_search}
						prefix={<IcMProfile size="md" />}
						suffix={(
							<ButtonIcon
								size="md"
								icon={<IcMAppSearch />}
								disabled={false}
								themeType="primary"
							/>
						)}
					/>
				</div>
			</div>
			{}
			<div className={styles.table_container}>
				<AttendanceData />
			</div>
		</>
	);
}

export default TeamAttendance;
