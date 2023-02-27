import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const score_data = [
	{
		label : 'Customer Expertise Score',
		score : '-',
	},
	{
		label : 'Trade Expertise Score',
		score : '-',
	},
	{
		label : 'Commodity Expertise Score',
		score : '-',
	},
	{
		label : 'Misc Expertise Score',
		score : '-',
	},
];

function KamLevelCard() {
	return (
		<div className={styles.whole}>
			<div style={{
				width          : '100%',
				display        : 'flex',
				justifyContent : 'space-between',
				alignItems     : 'center',
			}}
			>
				<div className={styles.text}>
					<div style={{ marginRight: '8px' }}>KAM</div>
					<b>
						1
					</b>
					<IcMArrowNext className={styles.arrow} />
					<b>2</b>
				</div>

				<div className={styles.button_container}>
					<Button themeType="secondary">Edit</Button>
					<div style={{ alignItems: 'center', justifyContent: 'center' }}><IcMDelete /></div>
				</div>

			</div>
			<div className={styles.score_container}>
				{score_data.map((item) => (
					<div className={styles.list_item}>
						<div key={item.label} className={styles.label_text}>{item.label}</div>
						<div key={item.score}><b>{item.score}</b></div>
					</div>
				))}
			</div>
		</div>
	);
}

export default KamLevelCard;
