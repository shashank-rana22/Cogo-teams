import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

function ListData({ list = [], getTableBodyCheckbox = () => { }, refetch = () => { }, source = '' }) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (
				<div key={item?.id} className={styles.position}>
					<ColumnCard
						item={item}
						getTableBodyCheckbox={getTableBodyCheckbox}
						refetch={refetch}
						source={source}
					/>
				</div>
			))}
		</div>
	);
}

export default ListData;
