import { cl, Button, Avatar, Modal } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import makeShortName from '../../../../../common/MakeShortName';

import styles from './styles.module.css';

function TeamLeaderBoard({ data = {} }) {
	const { rating_list } = data || {};
	const { rating_list: ratingList } = rating_list || {};

	const [showAll, setShowAll] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Team Leaderboard 🏆
				<Button themeType="secondary">
					Ratings
				</Button>
			</div>
			{(ratingList || []).slice(0, 5).map((item) => (
				<div className={styles.progress_flex} key={item}>
					<div className={styles.achieved_target}>
						<div className={styles.avatar}>
							{
							item.image
								? <img className={styles.user_avatar_photo} src={item.image} alt="profile" />
								:							(
									<div className={cl`${styles.user_avatar_photo} ${styles.user_avatar}`}>
										{makeShortName(item.name)}
									</div>
								)
						}
							{' '}
							{startCase(item.name)}
						</div>
					</div>
					<span className={styles.points}>
						{' '}
						{item.final_rating || '0'}
					</span>
				</div>
			))}

			{!showAll && ratingList && ratingList.length > 5 && (
				<Button themeType="tertiary" className={styles.sub_text} onClick={() => setShowAll(true)}>
					View All
					{' '}
					<IcMArrowRight
						width={12}
						height={12}
						style={{ marginLeft: 2 }}
					/>
				</Button>
			)}

			{setShowAll && (
				<Modal size="md" show={showAll} onClose={() => setShowAll(false)} placement="top">
					<Modal.Header title="Team List" />
					<Modal.Body>
						{ratingList.map((item) => (
							<div className={styles.progress_flex} key={item}>
								<div className={styles.achieved_target}>
									<div className={styles.avatar}>
										{item.image ? (
											<div className={styles.profile_photo}>
												<img src={item.image} alt="Profile" />
											</div>
										) : <Avatar personName={item.name} />}
										{' '}
										{startCase(item.name)}
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
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default TeamLeaderBoard;
