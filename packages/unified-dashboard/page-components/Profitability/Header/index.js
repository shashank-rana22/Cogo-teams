import { Select } from '@cogoport/components';
import React from 'react';

import Filter from '../../../common/Filter';

import styles from './styles.module.css';

function Header({ setFilters, range = 'current_month', setRange, filters, debounceQuery }) {
	const handleApplyFilters = (key, val) => {
		const dates = '01-01-2003';
		setFilters((prevFilters) => ({
			...prevFilters,
			...dates,
			[key] : val,
			page  : 1,
		}));
	};

	const handleSearch = (val) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			q: val,
		}));
		debounceQuery(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Shipment wise Profitability</div>
			<Filter
				setFilters={setFilters}
				range={range}
				setRange={setRange}
			/>

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
			<div className={styles.search_container}>
				<input
					className={styles.search}
					type="text"
					value={filters.q || ''}
					onChange={(e) => handleSearch(e.target.value)}
					placeholder="Search by Serial ID / Shipment ID"
				/>
			</div>
		</div>

	);
}

export default Header;
