import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import LoaderEscalation from './LoaderEscalations';
import styles from './styles.module.css';

function Escalation({ loading = false, escalations = [] }) {
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
			{(isEmpty(escalations)) ? (
				<img
					src={GLOBAL_CONSTANTS.image_url.empty_customer_card}
					alt="No Escalations"
					width={200}
					height={200}
					className={styles.empty_escalations_picture}
				/>
			)
				: (
					<div className={styles.redflags_lists}>
						{(escalations || []).map((item) => {
							const { agent_name, escalation_count, role, id } = item || {};

							return (
								<div className={styles.escalations_list} key={id}>
									<div className={styles.picture_name_kam_box}>
										<div className={styles.agent_picture}>
											<Image
												src={GLOBAL_CONSTANTS.image_url.agent_avatar_icon}
												alt="Agent Avatar"
												width={30}
												height={30}
											/>
										</div>
										<div className={styles.agent_name}>{agent_name}</div>
										<Tooltip
											content={<div>{role?.[GLOBAL_CONSTANTS.zeroth_index]?.name}</div>}
											placement="bottom"
										>
											<div className={styles.job_role}>
												{role?.[GLOBAL_CONSTANTS.zeroth_index]?.name}
											</div>
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
