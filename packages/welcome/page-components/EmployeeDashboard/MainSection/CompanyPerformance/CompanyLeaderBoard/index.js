import { Button, Avatar } from '@cogoport/components';
import { IcMArrowDown, IcMArrowRight } from '@cogoport/icons-react';
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
					<div className={styles.avatar}>
						<Avatar personName="Technology" />
						{' '}
						Technology
					</div>
				</div>
				{' '}
				<span className={styles.points}>5</span>
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						<Avatar personName="Product" />
						{' '}
						Product
					</div>
				</div>
				{' '}
				<span className={styles.points}> 4</span>
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						<Avatar personName="Design" />
						{' '}
						Design
					</div>
				</div>
				{' '}
				<span className={styles.points}> 4</span>
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						<Avatar personName="Sales" />
						{' '}
						Sales
					</div>
				</div>
				{' '}
				<span className={styles.points}> 4</span>
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						<Avatar personName="Supply" />
						{' '}
						Supply
					</div>
				</div>
				{' '}
				<span className={styles.points}> 4</span>
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
