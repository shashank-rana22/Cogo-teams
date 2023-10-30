import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

function List({ list = [], refetch }) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (<ColumnCard key={item?.id} item={item} refetch={refetch} />))}
		</div>
	);
}

export default List;
