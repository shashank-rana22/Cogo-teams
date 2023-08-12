import React from 'react';

import DateFilter from './DateFilter';
import styles from './styles.module.css';

function Filter({ setDateFilters = () => {}, range = '', setRange = () => {} }) {
	return (
		<div className={styles.container}>
			<DateFilter
				setDateFilters={setDateFilters}
				range={range}
				setRange={setRange}
			/>
		</div>
	);
}

export default Filter;
