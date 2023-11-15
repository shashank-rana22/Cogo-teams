import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

function List({ list = [], refetch = () => {}, selectedJV = [], setSelectedJV = () => {} }) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (
				<ColumnCard
					key={item?.id}
					item={item}
					refetch={refetch}
					selectedJV={selectedJV}
					setSelectedJV={setSelectedJV}
				/>
			))}
		</div>
	);
}

export default List;
