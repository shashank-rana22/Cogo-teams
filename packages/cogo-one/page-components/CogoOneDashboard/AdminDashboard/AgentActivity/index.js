import { cl } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import { configurationData } from '../../configurations/configurationData';
import { agentAvatar } from '../../constants';

import EmptyStateAgentActivity from './EmptyStateAgentActivity';
import styles from './styles.module.css';

function AgentActivity({ agentsDetails = {}, getCogoOneDashboard = () => {} }) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('busy_agents');
	const { agents_details_config } = configurationData;

	const tabMapping = {
		busy_agents    : styles.busy,
		online_agents  : styles.online,
		offline_agents : styles.offline,
	};

	const callStatusMapping = {
		busy_agents    : 'on call',
		online_agents  : 'online',
		offline_agents : 'offline',
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.activity_name}>Your Agents</div>
			<div className={styles.main_container_upperpart}>
				{Object.keys(agents_details_config).map((agentType) => {
					const { agent_label } = agents_details_config[agentType];
					return (
						<button
							className={`${styles.agent_nos_box} 
								${activeTab === agentType ? styles.agent_active_box : ''}`}
							onClick={() => setActiveTab(agentType)}
						>
							<div className={styles.agent_nos_box_uppersection}>
								<div className={styles.agents_nos}>{agentsDetails?.[agentType]?.total_agent || 0}</div>
								<div className={`${styles.agent_status} ${tabMapping[agentType]}`} />
							</div>
							<div className={styles.agents_status_text}>
								{agent_label}
							</div>
						</button>
					);
				})}

			</div>
			{isEmpty(agentsDetails?.[activeTab]?.agents) ? <EmptyStateAgentActivity />
				: (
					<div className={styles.main_container_lowerpart}>
						{agentsDetails?.[activeTab]?.agents?.map((item) => {
							const { name, active_assigned_chats, agent_id = '' } = item;

							const redirectToAgentView = (agentId = '42270ace-f97e-41e2-90bc-a336d90d791f') => {
								if (!agentId) return;
								router.push('/cogo-one/dashboard/[id]', `/cogo-one/dashboard/${agentId}`);
								if (agentId) {
									getCogoOneDashboard(agentId);
								}
							};

							return (
								<div
									className={styles.profile_box}
									role="presentation"
									onClick={() => redirectToAgentView(agent_id)}
								>
									<div className={styles.profile_box_left}>
										<div className={cl`${styles.circle_icon} ${tabMapping[activeTab]}`} />
										<div className={styles.profile_icon}><img src={agentAvatar} alt="AA" /></div>
									</div>
									<div className={styles.profile_box_right}>
										<div className={styles.profile_box_right_up}>
											<div className={styles.name}>{name}</div>
											<div className={styles.call_status}>{callStatusMapping[activeTab]}</div>
										</div>
										<div className={styles.profile_box_right_down}>
											<div className={styles.icon_plus_nos}>
												<div><IcMProfile fill="#BDBDBD" /></div>
												<div className={styles.contact_nos}>{active_assigned_chats}</div>
											</div>
											{/* <div className={styles.icon_plus_time}>
												<div><IcMTimer fill="#BDBDBD" /></div>
												<div className={styles.duration}>{duration}</div>
											</div> */}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
		</div>
	);
}

export default AgentActivity;
