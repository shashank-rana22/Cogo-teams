import { Toggle, Placeholder, cl, Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AgentDetail({
	createLoading = false,
	updateAgentPreference = () => {},
	loading = false,
	agent = '',
	status = '',
	agent_id = '',
}) {
	const onToggle = () => {
		let updated_status = 'inactive';
		if (status === 'inactive') {
			updated_status = 'active';
		}
		updateAgentPreference(agent_id, updated_status);
	};

	return (
		<div
			className={cl`${styles.agent_container} ${status === 'inactive' ? styles.inactive_agent_container : ''}`}
			key={agent_id}
		>
			{loading ? <Placeholder className={styles.agent_ph} /> : agent}

			{loading
				? <Placeholder className={styles.toggle_ph} />
				: (
					<div className={styles.status}>
						<Pill color="#C4DC91" size="sm">
							{startCase(status)}
						</Pill>

						<Toggle
							key={agent_id}
							name={agent}
							size="md"
							checked={status !== 'inactive'}
							value={status}
							onChange={onToggle}
							disabled={createLoading}
							className={styles.toggle}
						/>
					</div>
				)}
		</div>
	);
}

export default AgentDetail;
