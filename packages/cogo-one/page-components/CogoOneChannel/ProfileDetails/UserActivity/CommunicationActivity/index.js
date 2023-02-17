import { Avatar } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../../../../constants';

import styles from './styles.module.css';

function CommunicationActivity({ communication = {} }) {
	console.log('communication', communication);
	const { list = [] } = communication;

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { type = '', created_at = '', sender = '' } = item || {};
				return (
					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								5:00pm, Sept 24
							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div className={styles.activity_type}>
									Communication
								</div>
								<div className={styles.message_details}>
									<div className={styles.title}>
										Sent message on
										{' '}
										{startCase(type)}
									</div>
									<div className={styles.icon_type}>
										{SOURCE_ICON_MAPPING[type]}
									</div>
								</div>
								<div className={styles.user_details}>
									<div className={styles.user_message}>
										You have a message On
										{' '}
										{format(created_at, 'dd MMM YYYY')}
										{' '}
										from
										{' '}
										{startCase(sender)}
									</div>
									<div className={styles.user_avatar}>
										<Avatar
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/userAvatar.svg"
											alt="img"
											disabled={false}
											size="35px"
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			})}
		</div>
	);
}

export default CommunicationActivity;
