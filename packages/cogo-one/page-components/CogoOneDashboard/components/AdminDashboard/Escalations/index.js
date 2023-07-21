import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import useListEscalationChat from '../../../hooks/useListEscalationChat';

import LoaderEscalation from './LoaderEscalations';
import styles from './styles.module.css';

function Escalation() {
	const { data = {}, loading = false } = useListEscalationChat();
	const { list = [] } = data || {};

	if (loading) {
		return (
			<div className={styles.redflags_container}>
				<div className={styles.heading}>Escalations</div>
				<LoaderEscalation />
			</div>
		);
	}

	return (
		<div className={styles.redflags_container}>
			<div className={styles.heading}>Escalations</div>
			{(isEmpty(list)) ? (
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
					alt="No Escalations"
					width={200}
					height={200}
					className={styles.empty_escalations_picture}
				/>
			)
				: (
					<div className={styles.redflags_lists}>
						{(list || []).map((item) => {
							const { agent_data = {}, active_assigned_chats, id } = item || {};
							const { email = '', name = '' } = agent_data || {};

							return (
								<div className={styles.escalations_list} key={id}>
									<div className={styles.picture_name_kam_box}>
										<div className={styles.agent_picture}>
											<Image
												src={GLOBAL_CONSTANTS.image_url.agent_avatar_icon}
												alt="Agent Avatar"
												width={22}
												height={22}
											/>
										</div>
										<div className={styles.details}>
											<div className={styles.agent_name}>{startCase(name)}</div>
											<div className={styles.email_content}>{email}</div>
										</div>
									</div>
									<div className={styles.notification_nos}>{active_assigned_chats}</div>
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
}
export default Escalation;
