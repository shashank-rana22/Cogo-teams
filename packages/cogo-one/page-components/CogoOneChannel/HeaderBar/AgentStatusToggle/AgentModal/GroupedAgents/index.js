import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import AgentDetail from '../AgentDetail';

import styles from './styles.module.css';

function GroupedAgents({
	groupedList = [],
	groupName = '',
	createLoading = false,
	updateAgentPreference = () => {},
	loading = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.agent_type}>
				{!loading ? startCase(groupName) : <Placeholder height="20px" width="75px" />}
			</div>
			<div className={styles.grouped_list}>
				{groupedList.map((item) => {
					const { name = '', status = '', agent_id = '' } = item || {};

					return (
						<AgentDetail
							createLoading={createLoading}
							updateAgentPreference={updateAgentPreference}
							loading={loading}
							agent={name}
							status={status}
							agent_id={agent_id}
							key={agent_id}
						/>
					);
				})}
			</div>
		</div>
	);
}
export default GroupedAgents;
