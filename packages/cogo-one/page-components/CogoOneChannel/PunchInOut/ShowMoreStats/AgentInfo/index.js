import { Avatar, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AgentInfo({
	updateWorkPreference = () => {},
	loading = false,
	name = '',
	email = '',
	punchedTime = '',
	status = '',
	handleClick = () => {},
}) {
	const handleUpdate = () => {
		updateWorkPreference({ type: 'punched_out' });
	};

	return (
		<>
			<div className={styles.agent_name}>{startCase(name)}</div>
			<div className={styles.sub_label}>{email}</div>
			<Avatar personName={name} size="140px" className={styles.user_icon} />
			<div className={styles.text}>Time Clocked In Today</div>
			{status === 'punched_out'
				? <Button size="md" onClick={handleClick} disabled={loading}>Start Shift</Button>
				: (
					<div className={styles.start_time}>
						<div className={styles.time}>{punchedTime}</div>
						<Button
							size="md"
							themeType="accent"
							onClick={handleUpdate}
							disabled={loading}
						>
							End Shift
						</Button>
					</div>

				)}
		</>
	);
}

export default AgentInfo;
