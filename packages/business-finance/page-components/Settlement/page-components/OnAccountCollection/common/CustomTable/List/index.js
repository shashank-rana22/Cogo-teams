import React from 'react';

import Loader from '../../../../Loader';

import ColumnCard from './ColumnCard';
import RenderRibbon from './RenderRibbon';
import styles from './styles.module.css';

function List({
	list = [],
	refetch,
	loading,
	getTableBodyCheckbox,
}) {
	return loading ? (
		<Loader />
	) : (
		<div className={styles.list}>
			{list?.map((item) => (
				<div className={styles.column} key={item?.id}>
					<ColumnCard
						item={item}
						refetch={refetch}
						getTableBodyCheckbox={getTableBodyCheckbox}
					/>
					<div>
						<RenderRibbon item={item} />
					</div>
				</div>
			))}
		</div>
	);
}

export default List;
