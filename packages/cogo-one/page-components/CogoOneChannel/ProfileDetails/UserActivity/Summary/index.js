import { Avatar } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Summary({ chatDataList = [] }) {
	return (
		<div className={styles.container}>
			{(chatDataList || []).map((item) => {
				const {
					created_at,
					summary,
					summary_date,
				} = item || {};

				return (
					<>
						<div
							className={styles.activity_date}
							key={created_at}
						>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(summary_date, 'HH:mm a dd MMM')}
							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div className={styles.title}>
									{summary}
								</div>
								<div className={styles.user_avatar}>
									<Avatar
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
										alt="img"
										size="30px"
									/>
								</div>
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default Summary;
