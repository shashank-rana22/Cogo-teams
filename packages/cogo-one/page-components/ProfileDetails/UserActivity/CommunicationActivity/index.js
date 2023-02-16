import { Avatar } from '@cogoport/components';
import React from 'react';

import { SOURCE_ICON_MAPPING } from '../../../../constants';

import styles from './styles.module.css';

const type = 'email';
function CommunicationActivity({ communication }) {
	return (
		<div className={styles.container}>
			{[...Array(6)].map(() => (
				<>
					<div className={styles.activity_date}>
						<div className={styles.dot} />
						<div className={styles.durations}>
							5:00pm, Sept 24
						</div>
					</div>
					<div className={styles.main_card}>
						<div className={styles.card}>
							<div className={styles.activity_type}>
								Communication
							</div>
							<div className={styles.message_details}>
								<div className={styles.title}>
									Sent message on Whatsapp
								</div>
								<div className={styles.icon_type}>
									{SOURCE_ICON_MAPPING[type]}
								</div>
							</div>
							<div className={styles.user_details}>
								<div className={styles.user_message}>
									You have a message On 11 Sept 2023 from Kam 14
								</div>
								<div className={styles.user_avatar}>
									<Avatar
										src="https://www.w3schools.com/howto/img_avatar.png"
										alt="img"
										disabled={false}
										size="35px"
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			))}

		</div>
	);
}

export default CommunicationActivity;
