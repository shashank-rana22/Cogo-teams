import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardContent({ list_data = {}, value }) {
	function getTitle() {
		switch (value) {
			case 'count':
				return 'Count';
			case 'average':
				return 'Avg. Score';
			default:
				return '';
		}
	}

	function getValue() {
		switch (value) {
			case 'count':
				return list_data?.count;
			case 'average':
				return list_data?.average_score;
			default:
				return 0;
		}
	}

	function getPercentage() {
		switch (value) {
			case 'count':
				return list_data?.percentage_count_change;
			case 'average':
				return list_data?.percentage_score_change;
			default:
				return 0;
		}
	}

	const title = getTitle();
	const val = getValue();
	const percentage_change = getPercentage();

	return (
		<div className={styles.card_data_count}>
			<span style={{ color: '#4f4f4f' }}>{title}</span>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span style={{ fontSize: '24px', fontWeight: 'bold', paddingRight: '10px' }}>{val}</span>
				{ percentage_change !== undefined
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
							{percentage_change}
							%
						</span>
					)
					: ''}
			</div>
		</div>
	);
}

export default CardContent;
