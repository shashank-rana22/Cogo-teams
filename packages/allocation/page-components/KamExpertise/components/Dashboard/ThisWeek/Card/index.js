import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardContent({ dummy_data, value }) {
	function getTitle() {
		switch (value) {
			case 'count':
				return 'Count';
			case 'avg_score':
				return 'Avg. Score';
			default:
				return '';
		}
	}

	function getValue() {
		switch (value) {
			case 'count':
				return dummy_data.count;
			case 'avg_score':
				return dummy_data.avg_score;
			default:
				return 0;
		}
	}

	const title = getTitle();
	const val = getValue();

	return (
		<div className={styles.card_data_count}>
			<span style={{ color: '#4f4f4f' }}>{title}</span>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<span style={{ fontSize: '24px', fontWeight: 'bold', paddingRight: '10px' }}>{val}</span>
				<span style={{ display: 'flex' }}>
					<IcMArrowBack
						width={20}
						height={20}
						style={{
							color: `${dummy_data.has_increased
								? '#34C759' : '#ED3726'}`,
							transform: `${dummy_data.has_increased
								? 'rotate(135deg)' : 'rotate(-45deg)'}`,
						}}
					/>
					{dummy_data.percentage_change}
					%
				</span>
			</div>
		</div>
	);
}

export default CardContent;
