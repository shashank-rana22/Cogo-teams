import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { configurationData } from '../../../../configurations/configurationData';
import { agentAvatar, emptyEscalations } from '../../constants';
import LoaderRedFlags from '../LoaderRedFlags';

import styles from './styles.module.css';

function RedFlags({ loading = false }) {
	const { escalations: configEscalations = [] } = configurationData;

	return (
		<div className={styles.redflags_container}>
			<div className={styles.heading}>Escalations</div>
			{loading && <LoaderRedFlags />}
			{(isEmpty(configEscalations)) && !loading
				? <img src={emptyEscalations} alt="" width="300px" height="300px" />
				: (
					<div className={styles.redflags_lists}>
						{(configEscalations || []).map((item) => {
							const { agent_name, escalation_count, role } = item;
							return (
								<div className={styles.escalations_list}>
									<div className={styles.picture_name_kam_box}>
										<div className={styles.picture}>
											<img src={agentAvatar} alt="AA" />
										</div>
										<div className={styles.name}>{agent_name}</div>
										<div className={styles.job_role}>{role}</div>
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

export default RedFlags;
