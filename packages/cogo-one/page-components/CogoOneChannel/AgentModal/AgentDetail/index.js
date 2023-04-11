import { Toggle, Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function AgentDetail({
	createLoading = false,
	updateAgentPreference = () => {},
	loading = false,
	agent,
	status,
	agent_id,
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
			className={
				status === 'inactive'
					? styles.inactive_agent_container
					: styles.agent_container
				}
			key={agent_id}
		>
			{loading ? <Placeholder height="30px" width="75%" margin="10px 0px 0px" /> : agent}
			{loading
				? <Placeholder height="30px" width="10%" margin="10px 0px 0px" />
				: (
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
				)}
		</div>
	);
}

export default AgentDetail;
