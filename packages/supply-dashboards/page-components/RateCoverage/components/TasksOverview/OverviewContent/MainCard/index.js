import { ProgressBar } from '@cogoport/components';
import React from 'react';

import { DEFAULT_VALUE } from '../../../../configurations/helpers/constants';

import styles from './styles.module.css';

function MainCard({ data = {}, statsLoading = false }) {
	const { completed = 0, total = 0, completed_percentage = 0 } = data;

	const STATUS = [{
		label : 'Completed',
		value : completed,
	}, {
		label : 'Total',
		value : total,
	}];

	return (
		<div className={styles.container}>
			<ProgressBar progress={statsLoading ? DEFAULT_VALUE : completed_percentage} />
			{!statsLoading && (
				<div className={styles.sub_container}>
					{STATUS?.map((item) => (
						<div className={styles.column} key={item?.value}>
							<div>{item?.label}</div>
							<div className={styles.bold_font}>
								{item?.value}
								{' '}
								Rates
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default MainCard;
