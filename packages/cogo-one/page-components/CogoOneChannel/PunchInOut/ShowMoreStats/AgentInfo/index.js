import { Avatar, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AgentInfo({
	updateWorkPreference = () => {},
	loading = false,
	name = '',
	email = '',
	punchedTime = '',
	status = '',
	handlePunchIn = () => {},
}) {
	const handlePunchOut = () => {
		updateWorkPreference({ type: 'punched_out' });
	};

	return (
		<>
			<div className={styles.agent_name}>{startCase(name)}</div>
			<div className={styles.sub_label}>{email}</div>
			<Avatar personName={name} size="140px" className={styles.user_icon} />
			<div className={styles.text}>
				Time Clocked In
				<span>
					{formatDate({
						date       : punchedTime,
						formatType : 'date',
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
					})}
				</span>

			</div>
			{status === 'punched_out'
				? <Button size="md" onClick={handlePunchIn} disabled={loading}>Start Shift</Button>
				: (
					<div className={styles.start_time}>
						<div className={styles.time}>
							{formatDate({
								date       : punchedTime,
								formatType : 'time',
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							})}

						</div>
						<Button
							size="md"
							themeType="accent"
							onClick={handlePunchOut}
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
