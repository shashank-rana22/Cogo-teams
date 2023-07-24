import { cl } from '@cogoport/components';
import React from 'react';

import { STATUS_WISE_AGENTS_MAPPING } from '../../../constants';
import useListChatAgents from '../../../hooks/useListChatAgents';

import LoaderAgentActivity from './LoaderAgentActivityBox';
import MyAgents from './MyAgents';
import styles from './styles.module.css';

const TAB_MAPPING = {
	active   : styles.online,
	inactive : styles.offline,
	break    : styles.break,
};

function AgentActivity({ activeTab = '', setActiveTab = () => {} }) {
	const { data = {}, loading = false } = useListChatAgents({ activeTab });

	const { list = [], status_stats = {} } = data || {};

	return (
		<div className={styles.main_container}>
			<div className={styles.activity_name}>Your Agents</div>
			<div className={styles.main_container_upperpart}>
				{STATUS_WISE_AGENTS_MAPPING.map((val) => {
					const { label, name } = val || {};

					return (
						<div
							role="presentation"
							type="button"
							className={cl`${styles.agent_nos_box}
						${activeTab === name ? styles.agent_active_box : ''}`}
							key={name}
							onClick={() => setActiveTab(name)}
						>
							<div className={styles.agent_nos_box_uppersection}>
								<div className={styles.agents_nos}>{status_stats[name]}</div>
								<div className={cl`${styles.agent_status} ${TAB_MAPPING[name]}`} />
							</div>
							<div className={styles.agents_status_text}>
								{label}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.main_container_lowerpart}>
				{loading ? <LoaderAgentActivity /> : (
					<MyAgents
						list={list}
						activeTab={activeTab}
					/>
				)}

			</div>

		</div>
	);
}
export default AgentActivity;
