import { Button, Avatar } from '@cogoport/components';
import { IcMArrowUp, IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function TeamLeaderBoard({ data = {} }) {
	const { rating_list } = data || {};
	console.log('🚀 ~ file: index.js:9 ~ TeamLeaderBoard ~ data:', data);
	const { rating_list:ratingList } = rating_list || {};
	console.log('🚀 ~ file: index.js:10 ~ TeamLeaderBoard ~ ratingList:', ratingList);
	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Team Leaderboard 🏆
				<Button themeType="secondary">
					Ratings
					{/* <IcMArrowDown
						width={12}
						height={12}
						style={{ marginLeft: 2 }}
					/> */}

				</Button>
			</div>
			{(ratingList || []).map((item) => (
				<div className={styles.progress_flex} key={item}>
					<div className={styles.achieved_target}>
						<IcMArrowUp
							width={14}
							height={20}
							style={{ marginLeft: 2, marginRight: '8', color: '#00821D' }}
						/>
						{' '}

						<div className={styles.avatar}>
							{item.image ? (
								<div className={styles.profile_photo}>
									<img src={item.image} alt="Profile" />
								</div>
							) : <Avatar personName={item.name} />}
							{' '}
							{item.name}

						</div>
					</div>
					<span className={styles.points}>
						{' '}
						{item.final_rating || '0'}
						{' '}
						pts
					</span>

				</div>
			))}
			{/* <div className={styles.progress_flex}>
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
			</div> */}
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

export default TeamLeaderBoard;
