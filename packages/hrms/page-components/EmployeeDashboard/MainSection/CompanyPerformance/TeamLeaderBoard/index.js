import { Button, Avatar, Modal } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function TeamLeaderBoard({ data = {} }) {
	const [showAll, setShowAll] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Team Leaderboard 🏆
				<Button themeType="secondary">
					Ratings
				</Button>
			</div>
			{!isEmpty(data) ? (data || []).slice(0, 5).map((item) => (
				<div className={styles.progress_flex} key={item}>
					<div className={styles.achieved_target}>
						<div className={styles.avatar}>
							{item.image ? (
								<div className={styles.profile_photo}>
									<img src={item.image} alt="Profile" />
								</div>
							) : <Avatar personName={item.squad_name} style={{ marginRight: 6 }} />}
							{' '}
							{startCase(item.squad_name)}
						</div>
					</div>
					<span className={styles.points}>
						{' '}
						{item.average_rating || 0}
					</span>
				</div>
			)) : <EmptyState />}

			{ data?.length > 5 && (
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
						{data.map((item) => (
							<div className={styles.progress_flex} key={item}>
								<div className={styles.achieved_target}>
									<div className={styles.avatar}>
										{item.image ? (
											<div className={styles.profile_photo}>
												<img src={item.image} alt="Profile" />
											</div>
										) : <Avatar personName={item.squad_name} />}
										{' '}
										{startCase(item.squad_name)}
									</div>
								</div>
								<span className={styles.points}>
									{item.average_rating || 0}
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
