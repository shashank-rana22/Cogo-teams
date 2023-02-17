import { Tooltip, Pill } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import LoginComponent from './LoginComponent';
import styles from './styles.module.css';

function PlatformActivity({ platform = {} }) {
	console.log('platform', platform);
	const { login = {}, spot_searches = {} } = platform || {};
	const { list = [] } = spot_searches || {};
	return (
		<div className={styles.container}>
			<LoginComponent login={login} />
			{(list || []).map((item) => {
				const { created_at, serial_id } = item || {};
				return (
					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(created_at, 'HH:mm a dd MMM')}
							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<Pill size="md" color="#f8aea8">Platform</Pill>
								<div className={styles.booking_details}>
									<div className={styles.title}>
										Shipment Status
									</div>
									<div className={styles.booking_id}>
										ID:
										<span>{serial_id}</span>
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
				);
			})}
		</div>
	);
}

export default PlatformActivity;
