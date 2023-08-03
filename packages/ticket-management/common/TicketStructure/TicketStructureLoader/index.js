import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_FILL = 4;

function TicketLoader({ count = 0 }) {
	return (
		<div className={styles.tickets_container}>
			{[...Array(count || LOADER_FILL).keys()].map((key) => (
				<div key={key} className={styles.container}>
					<div className={styles.sub_container}>
						<div className={styles.header}>
							<Placeholder
								width="90px"
								height="18px"
								className={styles.skeleton}
							/>
							<Placeholder
								width="20px"
								height="18px"
								className={styles.skeleton}
							/>
						</div>
						<div className={styles.description}>
							<Placeholder
								width="220px"
								height="18px"
								className={styles.skeleton}
							/>
						</div>
					</div>
					<div className={styles.sub_container}>
						<div className={styles.header}>
							<Placeholder
								width="90px"
								height="18px"
								className={styles.skeleton}
							/>
							<div className={styles.ticket_date_time}>
								<div className={styles.ticket_date}>
									<Placeholder
										width="35px"
										height="18px"
										className={styles.skeleton}
									/>
								</div>
								<Placeholder
									width="35px"
									height="18px"
									className={styles.skeleton}
								/>
							</div>
						</div>
						<div className={styles.ticket_reason_box}>
							<Placeholder
								width="220px"
								height="18px"
								className={styles.skeleton}
							/>
							<div className={styles.messages_nos}>
								<Placeholder
									width="20px"
									height="18px"
									className={styles.skeleton}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TicketLoader;
