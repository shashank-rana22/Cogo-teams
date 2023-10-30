import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Sort({ sortBy, filters, setFilters }) {
	return (
		<div className={styles.sorticons}>
			<IcMArrowRotateUp
				height={10}
				width={10}
				style={{ cursor: 'pointer' }}
				color={filters?.sortType === 'Asc'
					? '#f68b21' : '#bdbdbd'}
				onClick={() => {
					setFilters((prev) => ({
						...prev,
						sortBy,
						sortType : 'Asc',
						page     : 1,
					}));
				}}
			/>
			<IcMArrowRotateDown
				height={10}
				width={10}
				color={filters?.sortType === 'Desc'
					? '#f68b21' : '#bdbdbd'}
				style={{ cursor: 'pointer' }}
				onClick={() => {
					setFilters((prev) => ({
						...prev,
						sortBy,
						sortType : 'Desc',
						page     : 1,
					}));
				}}
			/>
		</div>

	);
}

export default Sort;
