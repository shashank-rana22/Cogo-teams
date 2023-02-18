import { Avatar, Pagination } from '@cogoport/components';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';
import { SOURCE_ICON_MAPPING } from '../../../../../constants';

import styles from './styles.module.css';

function CommunicationActivity({ communication = {}, pagination, setPagination = () => {} }) {
	const { list = [], total_count } = communication;

	if (isEmpty(list)) {
		return (
		// <div className={styles.empty_state}>
			<EmptyState />
		// </div>
		);
	}

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { type = '', created_at = '', sender = '' } = item || {};
				return (
					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(created_at, 'HH:mm a dd MMM')}
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
			<div className={styles.pagination}>
				<Pagination
					type="page"
					currentPage={pagination}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(val) => setPagination(val)}
				/>
			</div>
		</div>
	);
}

export default CommunicationActivity;
