import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function TransactionalActivity({ transactional = {} }) {
	const { list = [] } = transactional;

	return (
		<div className={styles.container}>
			{(list || []).map((item) => {
				const { created_at = '', serial_id, milestone_activity = [] } = item || {};
				const bookingStatus = milestone_activity.pop();

				return (

					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(created_at, 'hh:mm a,')}
								{format(created_at, ' MMM dd')}

							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div className={styles.activity_type}>
									Transactional
								</div>
								<div className={styles.booking_details}>
									<div className={styles.title}>
										{startCase(bookingStatus?.milestone)}
									</div>
									<div className={styles.booking_id}>
										ID:
										{' '}
										{serial_id}
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

export default TransactionalActivity;
