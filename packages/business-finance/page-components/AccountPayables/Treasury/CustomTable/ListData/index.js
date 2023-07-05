import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

function ListData({ list = [], filters, setFilters }) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (
				<ColumnCard
					key={item?.id}
					item={item}
					filters={filters}
					setFilters={setFilters}
				/>
			))}
		</div>
	);
}

export default ListData;
