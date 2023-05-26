import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TicketStructureLoader({ listType = '' }) {
	const ticketStructureLoaderItems = listType === 'create' ? [...Array(2)].fill() : [...Array(4)].fill();

	return (
		<div className={styles.tickets_container}>
			{ticketStructureLoaderItems.map((key) => (
				<div key={key} className={styles.container}>
					<div className={styles.subcontainer_one}>
						<div className={styles.subcontainer_header}>
							<Placeholder
								width="90px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<Placeholder
								width="20px"
								height="18px"
								className={styles.loading_skeleton}
							/>
						</div>
						<div className={styles.description}>
							<Placeholder
								width="220px"
								height="18px"
								className={styles.loading_skeleton}
							/>
						</div>
					</div>
					<div className={styles.subcontainer_two}>
						<div className={styles.subcontainer_header}>
							<Placeholder
								width="90px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<div className={styles.ticket_date_time}>
								<div className={styles.ticket_date}>
									<Placeholder
										width="35px"
										height="18px"
										className={styles.loading_skeleton}
									/>
								</div>
								<Placeholder
									width="35px"
									height="18px"
									className={styles.loading_skeleton}
								/>
							</div>
						</div>
						<div className={styles.ticket_reason_box}>
							<Placeholder
								width="220px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<div className={styles.messages_nos}>
								<Placeholder
									width="20px"
									height="18px"
									className={styles.loading_skeleton}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TicketStructureLoader;
