import React from 'react';

import { agentAvatar } from '../../constants';
import LoaderRedFlags from '../LoaderRedFlags';

import styles from './styles.module.css';

function RedFlags({ loading = false, escalations = [] }) {
	return (
		<div className={styles.redflags_container}>
			<div className={styles.heading}>Escalations</div>

			{
					loading ? <LoaderRedFlags />
						: (
							<div className={styles.redflags_lists}>
								{(escalations || []).map((item) => {
									const { agent_name, escalation_count } = item;
									return (

										<div className={styles.escalations_list}>
											<div className={styles.picture_name_kam_box}>
												<div className={styles.picture}>
													<img src={agentAvatar} alt="AA" />
												</div>

												<div className={styles.name}>{agent_name}</div>
												<div className={styles.job_role}>kam</div>
											</div>
											<div className={styles.notification_nos}>{escalation_count}</div>
										</div>
									);
								})}
							</div>
						)
				}
		</div>
	);
}

export default RedFlags;
