import { Placeholder } from '@cogoport/components';
import React from 'react';

import { DEFAULT_VALUE, FIFTY, SEVENTY_FIVE } from '../../../../configurations/helpers/constants';

import CircularProgressBar from './ProgressBar';
import styles from './styles.module.css';

const getColor = (value) => {
	if (value >= DEFAULT_VALUE && value < FIFTY) { return 'red_color'; }
	if (value >= FIFTY && value < SEVENTY_FIVE) { return 'yellow_color'; }
	return 'green_color';
};

function Cards({ data = {}, statsLoading = false }) {
	const { weekly_completed_percentage = {} } = data;

	return (
		<div className={styles.container}>
			{Object.keys(weekly_completed_percentage).map((key) => (
				<div className={styles.box} key={key}>
					<CircularProgressBar
						key={key}
						percentage={weekly_completed_percentage[key]}
						color={getColor(weekly_completed_percentage[key])}
					/>

					<div className={styles.date}>
						{statsLoading ? <Placeholder className={styles.stat_loader} /> : (
							<>
								{' '}
								{ key }
							</>
						)}
					</div>
				</div>

			))}
		</div>
	);
}
export default Cards;
