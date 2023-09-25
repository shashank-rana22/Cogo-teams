import { IcMCross, IcC1 } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Announcement() {
	const [announcement, setAnnouncement] = useState(false);

	return (
		<div className={styles.container}>
			{announcement ? (
				<div className={styles.announcement_container}>
					<div className={styles.left_panel}>
						<div className={styles.tag}><IcC1 height={20} width={20} className={styles.icon} /></div>

						<div
							className={styles.announcement}
							role="presentation"
						>
							Get
							{' '}
							<b>10 New Leads</b>
							{' '}
							on Conversion of 2 New Accounts
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
