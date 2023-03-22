import React from 'react';

import DateFilter from './DateFilter';
import styles from './styles.module.css';

function Filter({ setFilters = () => {}, range = '', setRange = () => {} }) {
	return (
		<div className={styles.container}>
			<DateFilter
				setFilters={setFilters}
				range={range}
				setRange={setRange}
			/>
		</div>
	);
}

export default Filter;
