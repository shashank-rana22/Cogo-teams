import { Select, Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function FilterService({ setFilters, filters, uniqueServices }) {
	return (
		<div className={styles.container}>
			<Select
				className={styles.select_input}
				value={filters?.service_type}
				onChange={(e) => setFilters({ service_type: e })}
				placeholder="Choose service"
				isClearable
				size="sm"
				options={uniqueServices || []}
			/>

			<Input
				size="sm"
				className={styles.search_input}
				value={filters.name}
				placeholder="Search service by name"
				onChange={(e) => setFilters({ name: e })}
			/>
		</div>
	);
}

export default FilterService;
