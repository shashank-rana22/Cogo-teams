import { Button, Avatar, Modal } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function CompanyLeaderBoard({ data = [] }) {
	const [showAll, setShowAll] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header_flex}>
				Company Leaderboard 🏆
				<Button themeType="secondary">
					Rating
				</Button>
			</div>

			{!isEmpty(data) ? (data || []).slice(0, 5).map((val) => (
				<div className={styles.progress_flex} key={val.department_name}>
					<div className={styles.achieved_target}>
						<div className={styles.avatar}>
							<Avatar personName={val.department_name} style={{ marginRight: 4 }} />
							{' '}
							{val.department_name}
						</div>
					</div>
					{' '}
					<span className={styles.points}>{val.average_rating}</span>
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
										) : <Avatar personName={item.department_name} />}
										{' '}
										{startCase(item.department_name)}
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

export default CompanyLeaderBoard;
