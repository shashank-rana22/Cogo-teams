import { Select, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../common/Filter';

import styles from './styles.module.css';

function Header({ setFilters, range = 'current_month', setRange, filters, debounceQuery }) {
	const [q, setQ] = useState('');

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
		setQ(val);
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
				<Input
					size="sm"
					prefix={<IcMSearchlight />}
					value={q || ''}
					onChange={(e) => handleSearch(e)}
					placeholder="Serial ID / Shipment ID"
				/>
			</div>
		</div>

	);
}

export default Header;
