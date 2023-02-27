import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import FilterContent from '../../../common/FilterContentComponents/FilterContent';
import Filter from '../../../common/Filter';

import styles from './styles.module.css';

function Header({ setFilters, range = 'current_month', setRange, filters }) {
	const [openCalendar, setOpenCalendar] = useState(false);
	const [date, setDate] = useState({});

	const handleApplyFilters = (key, val) => {
		const dates = '01-01-2003';
		setFilters((prevFilters) => ({
			...prevFilters,
			...dates,
			[key] : val,
			page  : 1,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Shipment wise Profitability</div>
			<Filter />
			{/* <FilterContent
				applyFilters={handleApplyFilters}
				setOpen={setOpenCalendar}
				open={openCalendar}
				type="date-range"
				date={date}
				setDate={setDate}
				range={range}
				setRange={setRange}
			>
				<div className={styles.dateFilterWrap}
					onClick={() => setOpenCalendar(!openCalendar)}
					id="date_filter_wrap"
				>
					<div className={styles.h_flex}>
						<div className={styles.pill}>{startCase(range)}</div>
						<BorderRight />
						<div>{`${formatDateToString(
							date.startDate,
							'MMM dd, yyyy',
						)} - ${formatDateToString(date.endDate, 'MMM dd, yyyy')}`}</div>
					</div>
					<CaretDown style={{ width: '10px', height: '10px' }} />
				</div>
			</FilterContent> */}
			<Select
				className={styles.job_status}
				value={filters.job_status || ''}
				placeholder="Job Status"
				options={[
					{ label: 'Open', value: 'OPEN' },
					{ label: 'Closed', value: 'CLOSED' },
				]}
				isClearable
				theme="admin"
				onChange={(e) => handleApplyFilters('job_status', e)}
			/>
		</div>

	);
}

export default Header;
