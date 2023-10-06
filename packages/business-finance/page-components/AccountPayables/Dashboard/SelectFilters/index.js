import React from 'react';

import Filter from '../../../commons/Filters';

import { filterControls } from './filterControls';
import styles from './styles.module.css';

function SelectFilters({ filters, setFilters }) {
	return (
		<div className={styles.container}>
			<Filter
				controls={filterControls}
				filters={filters}
				setFilters={setFilters}
			/>
		</div>
	);
}

export default SelectFilters;
