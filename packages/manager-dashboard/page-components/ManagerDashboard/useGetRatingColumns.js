import React from 'react';

import styles from './styles.module.css';

const useGetRatingColumns = ({ t = () => {} }) => {
	const columns = [
		{
			Header   : <div className={styles.table_text}>{t('managerDashboard:rating_scale_label')}</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{item?.rating_scale}
				</div>
			),
			id: 'rating_scale',
		},
		{
			Header   : <div className={styles.table_text}>{t('managerDashboard:system_rating_label')}</div>,
			accessor : (item) => (
				<div className={styles.table_text}>
					{item?.count}
				</div>
			),
			id: 'system_rating',
		},
	];

	return columns;
};

export default useGetRatingColumns;
