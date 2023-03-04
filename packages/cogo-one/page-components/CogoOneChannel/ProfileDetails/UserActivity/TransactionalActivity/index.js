import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';
import { USER_ACTIVITY_KEYS_MAPPING } from '../../../../../constants/USER_ACTIVITY_KEYS_MAPPING';

import styles from './styles.module.css';

function TransactionalActivity({ transactional = {} }) {
	const { list = [] } = transactional;

	if (isEmpty(list)) {
		return (
			<EmptyState type="activities" />
		);
	}

	return (
		<div>
			{(list || []).map((item) => {
				const services = item?.shipment_type;
				const { origin = '', destination = '' } = USER_ACTIVITY_KEYS_MAPPING[services];

				const {
					created_at = '', serial_id, milestone_activity = [],

				} = item || {};

				const origin_port = item[origin] || {};

				const destination_port = item[destination] || {};

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
								<div className={styles.booking_details}>
									<div className={styles.title}>
										{startCase(
											milestone_activity[(milestone_activity?.length || 0) - 1]?.milestone || '',
										)}
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

											<Tooltip content={startCase(origin_port?.name)} placement="bottom">
												<div className={styles.port_name}>
													{startCase(origin_port?.name)}
												</div>
											</Tooltip>
											<div className={styles.port_codes}>
												{!isEmpty(origin_port?.port_code) && (
													<div>{origin_port?.port_code}</div>

												)}
											</div>
										</div>
										<div className={styles.country}>
											{startCase(origin_port?.country?.name)}
										</div>
									</div>
									<IcMPortArrow width={22} height={22} />
									<div className={styles.port}>
										<div className={styles.port_details}>
											<Tooltip content={startCase(destination_port?.name)} placement="bottom">
												<div className={styles.port_name}>
													{startCase(destination_port?.name)}
												</div>
											</Tooltip>
											<div className={styles.port_codes}>
												{!isEmpty(destination_port?.port_code) && (
													<div>{destination_port?.port_code}</div>
												)}
											</div>
										</div>
										<div className={styles.country}>
											{startCase(destination_port?.country?.name)}
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
