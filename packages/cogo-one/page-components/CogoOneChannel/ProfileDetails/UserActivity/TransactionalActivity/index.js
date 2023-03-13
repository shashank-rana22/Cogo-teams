import { Tooltip, cl } from '@cogoport/components';
import { IcMPortArrow, IcCFtick, IcMArrowDown } from '@cogoport/icons-react';
import { format, startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import { USER_ACTIVITY_KEYS_MAPPING } from '../../../../../constants/USER_ACTIVITY_KEYS_MAPPING';

import styles from './styles.module.css';

function TransactionalActivity({ transactional = {} }) {
	const [viewDetails, setViewDetails] = useState('');

	const handleOnClick = (uuid) => {
		if (viewDetails && viewDetails === uuid) {
			setViewDetails('');
		} else {
			setViewDetails(uuid);
		}
	};

	const { list = [] } = transactional;

	if (isEmpty(list)) {
		return (
			<EmptyState type="activities" />
		);
	}

	return (
		<div>
			{(list || []).map((item) => {
				const viewCheck = viewDetails === item?.id;
				const services = item?.shipment_type;
				const { origin = '', destination = '' } = USER_ACTIVITY_KEYS_MAPPING[services] || {};

				const {
					created_at = '', serial_id,
					milestone_activity = [],
				} = item || {};

				const milestoneActivity = [...milestone_activity].reverse();

				const filteredMilestoneActivity = milestoneActivity.filter((val) => val?.completed_on);

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

								<div className={cl`${styles.card_details} 
						${viewCheck ? styles.open_card_details : ''}`}
								>

									<div className={styles.booking_id}>
										SID:
										{' '}
										{serial_id}

									</div>
									<div className={styles.port_pair}>
										<div className={styles.port}>
											<div className={styles.port_details}>

												<Tooltip
													content={startCase(origin_port?.name)}
													placement="bottom"
												>
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
												<Tooltip
													content={startCase(destination_port?.name)}
													placement="bottom"
												>
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
									<div className={styles.milestone_container}>

										{(filteredMilestoneActivity || []).map((val, index) => {
											const { milestone = '', completed_on = '' } = val || {};
											return (
												<div>

													<div className={styles.activity_date}>
														<div className={styles.dot} />
														<div className={styles.durations}>
															{format(completed_on, 'hh:mm a,')}
															{format(completed_on, ' MMM dd')}

														</div>
													</div>
													<div
														className={cl`${styles.milestone_main_card} 
																 ${index === milestoneActivity.length - 1
															? styles.milestone_last_card : ''}`}
													>

														<div
															className={styles.milestone_name_container}
														>
															<IcCFtick width={16} height={16} />
															<Tooltip
																content={startCase(milestone)}
																placement="bottom"
															>
																<div className={styles.milestone_name}>
																	{startCase(milestone)}
																</div>
															</Tooltip>
														</div>
													</div>

												</div>
											);
										})}
									</div>

								</div>
								{filteredMilestoneActivity.length > 1 && (
									<div
										role="presentation"
										className={styles.show_more}
										onClick={() => handleOnClick(item.id)}
									>
										<IcMArrowDown
											width={16}
											height={16}
											onClick={() => handleOnClick(item.id)}
											className={cl`${styles.arrow_down_icon} 
																 ${viewCheck ? styles.arrow_up_icon : ''}`}
										/>
									</div>
								)}

							</div>

						</div>

					</>
				);
			})}

		</div>
	);
}

export default TransactionalActivity;
