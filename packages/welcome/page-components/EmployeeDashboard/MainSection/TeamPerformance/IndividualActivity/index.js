import { ProgressBar, Avatar } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function IndividualActivity() {
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Individual Activity
			</div>
			<div className={styles.progress_flex}>
				<div className={styles.achieved_target}>
					<div className={styles.avatar}>
						<Avatar personName="Akshay Sawant" />
						{' '}
						Akshay Bro

					</div>
				</div>
				{' '}
				<span className={styles.points}> 100 pts</span>
			</div>

			<div className={styles.progress_flex_2}>
				<div className={styles.badge}>
					<div className={styles.upper_text}>Badge</div>
					<div className={styles.lower_text}>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Star_1.svg"
							alt="star"
						/>
						<span style={{ marginLeft: '4px' }}>Believer</span>
					</div>
				</div>
				<div className={styles.badge}>
					<div className={styles.upper_text}>Claps Received</div>
					<div className={styles.lower_text}>
						👏
						<span style={{ marginLeft: '4px' }}>32 Claps</span>
					</div>
				</div>
			</div>
			<div className={styles.progress_flex_2}>
				<div className={styles.dot_2}>
					<div className={styles.upper_text}>
						<div className={styles.dot} />
						Total hours worked
					</div>
					<div className={styles.lower_text}>
						<span>200 hr 30 min</span>
					</div>
				</div>
				<div className={styles.dot_2}>
					<div className={styles.upper_text}>
						<div className={styles.dot_b} />
						Deviation
					</div>
					<div className={styles.lower_text}>
						<span>13 hr</span>
					</div>
				</div>
				<div className={styles.dot_2}>
					<div className={styles.upper_text}>
						<div className={styles.dot_g} />
						Absence
					</div>
					<div className={styles.lower_text}>
						<span>13 hr</span>
					</div>
				</div>
			</div>
			<div>
				<ProgressBar progress={100} uploadText=" Achieved" style={{ display: 'flex', width: '60%' }} />
				<ProgressBar progress={100} uploadText=" Achieved" width={5} />
			</div>

		</div>
	);
}

export default IndividualActivity;
