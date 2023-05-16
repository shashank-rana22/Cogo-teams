import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

function List({ list = [] }) {
	return (
		<div className={styles.list}>
			{list?.map((item) => (<ColumnCard key={item?.id} item={item} />))}
		</div>
	);
}

export default List;
