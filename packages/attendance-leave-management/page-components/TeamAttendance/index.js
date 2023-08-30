import { Button, Select, Input, ButtonIcon, cl } from '@cogoport/components';
import { IcMDownload, IcMProfile, IcMAppSearch, IcMArrowLeft, IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

// import StyledTable from '../../common/StyledTable';

import Loader from '../../common/Loader';
import useGetCycles from '../../hooks/useGetCycles';
import useGetTeamAttendance from '../../hooks/useGetTeamAttendance';

import AttendanceData from './AttendanceData';
import AttendanceMobile from './AttendanceMobile';
import styles from './styles.module.css';

const DEFAULT_COUNT = 1;

function TeamAttendance() {
	const [searchQuery, setSearchQuery] = useState('');
	const [month, setMonth] = useState('');
	const { loading, formattedData } = useGetCycles();
	const { data, setFilters, debounceQuery, loading : statsLoading } = useGetTeamAttendance(month);

	const { page_no, total_pages } = data || {};

	const handleNext = () => {
		if (page_no === total_pages) return;
		setFilters({
			page_no: page_no + DEFAULT_COUNT,
		});
	};

	const handlePrev = () => {
		if (page_no === DEFAULT_COUNT) return;
		setFilters({
			page_no: page_no - DEFAULT_COUNT,
		});
	};

	const handleMonth = (e) => {
		setMonth(e);
		setFilters({
			page_no: undefined,
		});
	};

	const handleSearch = (e) => {
		debounceQuery(e);
		setSearchQuery(e);
	};

	useEffect(() => {
		if (!isEmpty(formattedData)) {
			const [firstData] = formattedData || [];
			setMonth(firstData?.value);
		}
	}, [formattedData]);

	return (
		<>
			<div className={styles.header_container}>
				<h3 className={styles.heading}>Team Attendance</h3>
				<div className={styles.header_container_flex}>
					<div className={styles.select_container}>
						{!loading && (
							<Select
								value={month}
								onChange={(e) => handleMonth(e)}
								placeholder="Select Month"
								options={formattedData}
								size="md"
							/>
						)}
					</div>
					<Button className={styles.download} themeType="secondary" size="lg">
						<span className={styles.download_text}>
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
						value={searchQuery}
						onChange={(e) => handleSearch(e)}
					/>
				</div>
			</div>
			{ statsLoading ? (
				<div className={styles.loader_container}>
					<Loader />
				</div>
			) : (
				<>
					<div className={styles.table_container}>
						<div className={styles.attendance_data}>
							<AttendanceData data={data} />
						</div>
						<div className={styles.attendance_mobile}>
							<AttendanceMobile data={data} />
						</div>
					</div>
					<div className={styles.pagination_container}>
						<div
							className={cl`${styles.arrow_container} ${styles.mr_12}`}
							onClick={handlePrev}
							aria-hidden
						>
							<IcMArrowLeft width={25} height={25} />
						</div>
						<div
							className={styles.arrow_container}
							onClick={handleNext}
							aria-hidden
						>
							<IcMArrowRight width={25} height={25} />
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default TeamAttendance;
