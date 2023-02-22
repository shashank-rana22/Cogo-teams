import { IcMProfile, IcMTimer } from '@cogoport/icons-react';
import React from 'react';

import { agentActivityStatus } from '../../../configurations/dummyAgentActivityStatusData';
import { busyAgentsData } from '../../../configurations/dummyBusyAgentProfileData';

import styles from './styles.module.css';

function AgentActivity() {
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>

			<div className={styles.main_container}>
				<div className={styles.activity_name}>Your Agents</div>
				<div className={styles.main_container_upperpart}>

					{agentActivityStatus.map((item) => {
						const { nos, text, icon } = item;
						return (

							<div className={styles.agent_nos_box}>
								<div className={styles.agent_nos_box_uppersection}>
									<div className={styles.agents_nos}>{nos}</div>
									<div className={styles.corner_icon}>{icon}</div>
								</div>

								<div className={styles.agents_status_text}>
									{text}
								</div>
							</div>

						);
					})}

				</div>

				<div className={styles.main_container_lowerpart}>

					{busyAgentsData.map((item) => {
						const { circle_icon, picture, name, call_status, contact_nos, duration } = item;
						return (
							<div className={styles.profile_box}>
								<div className={styles.profile_box_left}>
									<div className={styles.circle_icon}>{circle_icon}</div>
									<div className={styles.profile_icon}>{picture}</div>
								</div>
								<div className={styles.profile_box_right}>
									<div className={styles.profile_box_right_up}>
										<div className={styles.c}>{name}</div>
										<div className={styles.call_status}>{call_status}</div>
									</div>
									<div className={styles.profile_box_right_down}>
										<div className={styles.icon_plus_nos}>
											<div><IcMProfile fill="#BDBDBD" /></div>
											<div className={styles.contact_nos}>{contact_nos}</div>
										</div>
										<div className={styles.icon_plus_time}>
											<div><IcMTimer fill="#BDBDBD" /></div>
											<div className={styles.duration}>{duration}</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}

				</div>
			</div>

		</>

	);
}

export default AgentActivity;
