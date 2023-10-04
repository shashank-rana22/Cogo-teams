import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Announcement() {
	const [announcement, setAnnouncement] = useState(false);

	return (
		<div className={styles.container}>
			{announcement ? (
				<div className={styles.announcement_container}>
					<div className={styles.left_panel}>
						<div className={styles.tag}><span className={styles.badge}>{GLOBAL_CONSTANTS.one}</span></div>

						<div
							className={styles.announcement}
							role="presentation"
						>
							Any new announcements related to
							{' '}
							<b>Performance, Incentives and Rewards</b>
							{' '}
							will be displayed here!
						</div>
					</div>

					<IcMCross
						style={{ marginRight: '12px', cursor: 'pointer' }}
						onClick={() => setAnnouncement(false)}
					/>
				</div>
			) : (
				<div
					className={styles.announcement_button}
					role="presentation"
					onClick={() => setAnnouncement(true)}
				>
					Announcement
				</div>
			)}
		</div>
	);
}

export default Announcement;
