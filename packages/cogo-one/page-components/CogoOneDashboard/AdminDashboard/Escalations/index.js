import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { agentAvatar, emptyEscalations } from '../../constants';

import LoaderEscalation from './LoaderEscalations';
import styles from './styles.module.css';

function Escalation({ loading = false, escalations = [] }) {
	return (
		<div className={styles.redflags_container}>
			<div className={styles.heading}>Escalations</div>
			{loading && <LoaderEscalation />}
			{(isEmpty(escalations)) && !loading
				? (
					<img
						src={emptyEscalations}
						alt=""
						width="200px"
						height="200px"
						className={styles.empty_escalations_picture}
					/>
				)
				: (
					<div className={styles.redflags_lists}>
						{(escalations || []).map((item) => {
							const { agent_name, escalation_count, role } = item;
							return (
								<div className={styles.escalations_list}>
									<div className={styles.picture_name_kam_box}>
										<div className={styles.picture}>
											<img src={agentAvatar} alt="AA" />
										</div>
										<div className={styles.name}>{agent_name}</div>
										<Tooltip
											content={<div>{role?.[0].name}</div>}
											placement="bottom"
										>
											<div className={styles.job_role}>{role?.[0].name}</div>
										</Tooltip>
									</div>
									<div className={styles.notification_nos}>{escalation_count}</div>
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
}

export default Escalation;
