import React from 'react';

import ColumnCard from './ColumnCard';
import RenderRibbon from './RenderRibbon';
import styles from './styles.module.css';

function List({ list = [], refetch, loading }) {
	return (
		<div className={styles.list}>
			{list?.map((item) => (
				<div className={styles.column} key={item?.id}>
					<ColumnCard item={item} refetch={refetch} loading={loading} />
					<div>
						<RenderRibbon item={item} />
					</div>
				</div>
			))}
		</div>
	);
}

export default List;
