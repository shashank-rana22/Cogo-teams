import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.empty_container}>
			{[...Array(6).keys()].map((key) => (
				<div key={key} className={styles.card}>
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
								width="70px"
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
								width="160px"
								height="18px"
								className={styles.skeleton}
							/>
							<Placeholder
								width="80px"
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
				</div>
			))}
		</div>
	);
}

export default Loader;
