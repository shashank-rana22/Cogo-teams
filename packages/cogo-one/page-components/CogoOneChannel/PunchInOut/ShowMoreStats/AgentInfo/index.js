import { Avatar, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function AgentInfo({
	updateWorkPreference = () => {},
	// data = {},
	loading = false,
	name = '',
	// picture,
	email = '',
}) {
	const handleClick = () => {
		updateWorkPreference({ type: 'punched_out' });
	};

	return (
		<>
			<div className={styles.agent_name}>{startCase(name)}</div>
			<div className={styles.sub_label}>{email}</div>
			<Avatar personName={name} size="140px" className={styles.user_icon} />
			{/* <Image
				src={GLOBAL_CONSTANTS.image_url.girl_avatar}
				alt="user"
				width={110}
				height={130}
				className={styles.user_icon}
			/> */}

			<div className={styles.text}>Time Clocked In Today</div>
			<div className={styles.start_time}>
				<div className={styles.time}>07:45:15</div>
				<Button size="md" themeType="accent" onClick={handleClick} disabled={loading}>End Shift</Button>
			</div>
		</>
	);
}

export default AgentInfo;
