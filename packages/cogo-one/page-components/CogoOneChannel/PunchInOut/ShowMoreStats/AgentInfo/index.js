import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import styles from './styles.module.css';

function AgentInfo() {
	return (
		<>
			<div className={styles.agent_name}>Anuradha Agarwal</div>
			<div className={styles.sub_label}>Demand Specialist</div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.girl_avatar}
				alt="user"
				width={110}
				height={130}
				className={styles.user_icon}
			/>

			<div className={styles.text}>Time Clocked In Today</div>
			<div className={styles.start_time}>
				<div className={styles.time}>07:45:15</div>
				<Button size="md" themeType="accent">End Shift</Button>
			</div>
		</>
	);
}

export default AgentInfo;
