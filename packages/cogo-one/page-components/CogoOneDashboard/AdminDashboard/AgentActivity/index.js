/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { IcMProfile, IcMTimer } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { agentActivityStatus } from '../../../../configurations/dummyAgentActivityStatusData';
import { busyAgentsData } from '../../../../configurations/dummyBusyAgentProfileData';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

function AgentActivity({ emptyState = false }) {
	const [activeTab, setActiveTab] = useState('busy');

	const tabMapping = {
		busy    : styles.busy,
		online  : styles.online,
		offline : styles.offline,
	};

	const callStatusMapping = {
		busy    : 'on call',
		online  : 'online',
		offline : 'offline',
	};

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<div className={styles.main_container}>
				<div className={styles.activity_name}>Your Agents</div>
				<div className={styles.main_container_upperpart}>
					{agentActivityStatus.map((item) => {
						const { text, key } = item;
						const countMapping = {
							busy    : 30,
							online  : 40,
							offline : 100,
						};
						return (
							<button
								className={`${styles.agent_nos_box} 
								${activeTab === key ? styles.agent_active_box : ''}`}
								onClick={() => setActiveTab(key)}
							>
								<div className={styles.agent_nos_box_uppersection}>
									<div className={styles.agents_nos}>{countMapping[key]}</div>
									<div className={`${styles.agent_status} ${tabMapping[key]}`} />
								</div>
								<div className={styles.agents_status_text}>
									{text}
								</div>
							</button>
						);
					})}

				</div>
				{
							emptyState ? <EmptyState />
								: (

									<div className={styles.main_container_lowerpart}>
										{busyAgentsData.map((item) => {
											const { picture, name, contact_nos, duration } = item;

											return (
												<div className={styles.profile_box}>
													<div className={styles.profile_box_left}>
														<div className={cl`${styles.circle_icon} ${tabMapping[activeTab]}`} />
														<div className={styles.profile_icon}>{picture}</div>
													</div>
													<div className={styles.profile_box_right}>
														<div className={styles.profile_box_right_up}>
															<div className={styles.name}>{name}</div>
															<div className={styles.call_status}>{callStatusMapping[activeTab]}</div>
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
								)

					}
			</div>

		</>

	);
}

export default AgentActivity;
