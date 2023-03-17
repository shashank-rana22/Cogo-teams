import React, { useState } from 'react';

import Filter from '../../../commons/Filters';

import { filterControls } from './filterControls';
import styles from './styles.module.css';

function SelectFilters() {
	const [filters, setFilters] = useState({ zone: '', serviceType: '', days: '' });

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
