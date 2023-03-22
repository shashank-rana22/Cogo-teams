import { IcM0, IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardContent({ list_data = {}, value }) {
	// Todo deal with only a single object rather than using 3 different object
	// Todo percentage change can be string -> dal with it in the frontend
	const TITLE_MAPPING = {
		count   : 'Count',
		average : 'Avg. Score',
	};

	const VALUE_MAPPING = {
		count   : list_data.count,
		average : list_data.average_score,
	};

	const PERCENTAGE_MAPPING = {
		count   : list_data.percentage_count_change,
		average : list_data.percentage_score_change,
	};

	const title = (value === 'count' ? TITLE_MAPPING.count : TITLE_MAPPING.average);
	const val = (value === 'count' ? VALUE_MAPPING.count : VALUE_MAPPING.average);
	const percentage_change = (value === 'count' ? PERCENTAGE_MAPPING.count : PERCENTAGE_MAPPING.average);

	return (
		<div className={styles.card_data_count}>
			<span style={{ color: '#4f4f4f' }}>{title}</span>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span style={{ fontSize: '24px', fontWeight: 'bold', paddingRight: '10px' }}>{val}</span>
				{ percentage_change !== 0
					?				(
						<span style={{ display: 'flex' }}>
							<IcMArrowBack
								width={20}
								height={20}
								style={{
									color: `${percentage_change > 0
										? '#34C759' : '#ED3726'}`,
									transform: `${percentage_change > 0
										? 'rotate(135deg)' : 'rotate(-45deg)'}`,
								}}
							/>
							<span style={{ marginLeft: '4px' }}>
								{percentage_change}
								%
							</span>
						</span>
					)
					: (
						<span style={{ marginLeft: '4px' }}>
							{percentage_change}
							%
						</span>
					)}
			</div>
		</div>
	);
}

export default CardContent;
