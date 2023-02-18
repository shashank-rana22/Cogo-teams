import { Tooltip, Pagination } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';
import { TRANSACTIONAL_KEYS_MAPPING } from '../../../../../constants/TRANSACTIONAL_KEYS_MAPPING';

import styles from './styles.module.css';

function TransactionalActivity({ transactional = {}, pagination, setPagination = () => {} }) {
	// console.log('sdfdfgddf', transactional);
	const { list = [], total_count } = transactional;

	if (isEmpty(list)) {
		return (
		// <div className={styles.empty_state}>
			<EmptyState />
		// </div>
		);
	}

	return (
		<div>
			{(list || []).map((item) => {
				const services = item?.shipment_type;
				const { name:{ origin = '', destination = '' } } = TRANSACTIONAL_KEYS_MAPPING[services];

				const {
					created_at = '', serial_id, milestone_activity = [],
				} = item || {};

				const origin_port = item[origin] || {};
				// console.log('origin_port', origin_port);

				const destination_port = item[destination] || {};
				// console.log('destination_port', destination_port);

				const bookingStatus = milestone_activity.pop();
				// console.log('bookingStatus', milestone_activity, bookingStatus?.milestone);

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
											<Tooltip content={startCase(origin_port?.name)} placement="bottom">
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
			<div className={styles.pagination}>
				<Pagination
					type="page"
					currentPage={pagination}
					totalItems={total_count}
					pageSize={10}
					onPageChange={(val) => setPagination(val)}
				/>
			</div>
		</div>
	);
}

export default TransactionalActivity;
