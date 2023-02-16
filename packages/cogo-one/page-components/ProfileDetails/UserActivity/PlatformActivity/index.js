import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PlatformActivity({ platform = {} }) {
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
								Platform
							</div>
							<div className={styles.booking_details}>
								<div className={styles.title}>
									Booking Placed
								</div>
								<div className={styles.booking_id}>
									ID: 12312821
								</div>
							</div>
							<div className={styles.port_pair}>
								<div className={styles.port}>
									<div className={styles.port_details}>

										<Tooltip content="Shanghai Shanghai" placement="bottom">
											<div className={styles.port_name}>
												Shanghai
											</div>
										</Tooltip>

										<div className={styles.port_code}>
											(CNSHA)
										</div>
									</div>
									<div className={styles.country}>
										China
									</div>
								</div>
								<IcMPortArrow width={22} height={22} />
								<div className={styles.port}>
									<div className={styles.port_details}>
										<div className={styles.port_name}>
											Shanghai
										</div>
										<div className={styles.port_code}>
											(CNSHA)
										</div>
									</div>
									<div className={styles.country}>
										China
									</div>
								</div>
							</div>
						</div>

					</div>

				</>
			))}

		</div>
	);
}

export default PlatformActivity;
