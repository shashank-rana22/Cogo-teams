import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const useGetRatingColumns = () => {
	const columns = [
		{
			Header   : <div className={styles.table_text}>Rating</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.rating_scale) || '-'}
				</div>
			),
			id: 'rating_scale',
		},
		{
			Header   : <div className={styles.table_text}>No. of Employee</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{startCase(item?.system_rating) || '-'}
				</div>
			),
			id: 'system_rating',
		},
	];

	return columns;
};

export default useGetRatingColumns;
