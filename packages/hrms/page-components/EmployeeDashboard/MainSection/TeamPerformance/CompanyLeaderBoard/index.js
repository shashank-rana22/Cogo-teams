import { Button, Avatar } from '@cogoport/components';
import { IcMArrowDown, IcMArrowUp, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CompanyLeaderBoard() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Company Leaderboard 🏆
				<Button themeType="secondary">
					Story Points
					<IcMArrowDown
						width={12}
						height={12}
						style={{ marginLeft: 2 }}
					/>

				</Button>
			</div>

			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<IcMArrowUp
						width={14}
						height={20}
						style={{ marginLeft: 2, marginRight: '8', color: '#00821D' }}
					/>
					{' '}
					1
					<div className={styles.avatar}>
						<Avatar personName="Akshay Sawant" />
						{' '}
						Akshay Bro

					</div>
				</div>
				{' '}
				<span className={styles.points}> 100 pts</span>
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<IcMArrowUp
						width={14}
						height={20}
						style={{ marginLeft: 2, marginRight: '8', color: '#00821D' }}
					/>
					{' '}
					1
					<div className={styles.avatar}>
						<Avatar personName="Akshay Sawant" />
						{' '}
						Akshay Bro

					</div>
				</div>
				{' '}
				<span className={styles.points}> 100 pts</span>
			</div>
			<Button themeType="tertiary" className={styles.sub_text}>
				View All
				{' '}
				<IcMArrowRight
					width={12}
					height={12}
					style={{ marginLeft: 2 }}
				/>

			</Button>
		</div>
	);
}

export default CompanyLeaderBoard;
