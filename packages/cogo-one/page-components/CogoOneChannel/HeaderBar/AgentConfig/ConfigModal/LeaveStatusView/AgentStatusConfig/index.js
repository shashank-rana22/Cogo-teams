import { Button, Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function AgentStatusConfig({
	status = '',
	agentId = '',
	onChangeToggle = () => {},
	statusLoading = false,
	handleToggle = () => {},
}) {
	return (
		<div className={styles.container}>
			<Button
				size="sm"
				themeType="primary"
				onClick={() => handleToggle({ status, agentId })}
				disabled={statusLoading}
			>
				Mark as Leave

			</Button>
			<Toggle
				size="md"
				checked={status === 'active'}
				value={status}
				onChange={() => onChangeToggle({ agentId, status })}
				disabled={statusLoading}
				className={styles.toggle}
			/>
		</div>
	);
}

export default AgentStatusConfig;
