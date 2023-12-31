import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow, IcCFtick, IcMArrowDown } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { format, startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import RaiseTicketModal from '../../../../../common/RaiseTicketModal';
import { USER_ACTIVITY_KEYS_MAPPING } from '../../../../../constants/USER_ACTIVITY_KEYS_MAPPING';

import styles from './styles.module.css';

const DEFAULT_LENGTH_OF_MILESTONE_ACTIVITY = 0;
const REMOVE_LENGTH_OF_MILESTONE_ACTIVITY = 1;
const MAX_LENGTH_OF_MILESTONE_ACTIVITY = 1;

function TransactionalActivity({ transactional = {} }) {
	const router = useRouter();

	const { userId } = useSelector(({ profile }) => ({
		userId: profile.user.id,

	}));

	const [viewDetails, setViewDetails] = useState('');

	const redirectToShipment = (shipmentId) => {
		const newUrl = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipmentId}`;
		window.open(
			newUrl,
			'_blank',
			'noreferrer',
		);
	};

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
				const { id = '', shipment_type = '', trade_type = '', importer_exporter_id = '' } = item || {};
				const viewCheck = viewDetails === id;
				const services = shipment_type;
				const { origin = '', destination = '' } = USER_ACTIVITY_KEYS_MAPPING[services] || {};

				const {
					created_at = '', serial_id,
					milestone_activity = [],
				} = item || {};

				const milestoneActivity = [...milestone_activity].reverse();

				const filteredMilestoneActivity = milestoneActivity.filter((val) => val?.completed_on);

				const origin_port = item[origin] || {};

				const { name = '', port_code = '' } = origin_port || {};

				const destination_port = item[destination] || {};

				const { name: destination_name = '', port_code: destination_port_code = '' } = destination_port || {};

				const SHIPMENT_FORMATTED_DATA = {
					category     : shipment_type,
					sub_category : trade_type,
					shipment_id  : serial_id,
					user_id      : userId,
					importer_exporter_id,
				};

				return (
					<>
						<div className={styles.activity_date}>
							<div className={styles.dot} />
							<div className={styles.durations}>
								{format(created_at, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'])}
								{format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM'])}

							</div>
						</div>
						<div className={styles.main_card}>
							<div className={styles.card}>
								<div
									className={cl`${viewCheck ? styles.open_card_details : styles.card_details}`}
								>
									<div className={styles.header}>
										<div
											role="presentation"
											className={styles.booking_id}
											onClick={() => redirectToShipment(id)}
										>
											SID:
											{' '}
											{serial_id}
										</div>
										<RaiseTicketModal shipmentData={SHIPMENT_FORMATTED_DATA} />
									</div>

									<div className={styles.port_pair}>
										<div className={styles.port}>
											<div className={styles.port_details}>

												<Tooltip
													content={startCase(name)}
													placement="bottom"
												>
													<div className={styles.port_name}>
														{startCase(name)}
													</div>
												</Tooltip>
												<div className={styles.port_codes}>
													{!isEmpty(port_code) && (
														<div>{port_code}</div>
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
													content={startCase(destination_name)}
													placement="bottom"
												>
													<div className={styles.port_name}>
														{startCase(destination_name)}
													</div>
												</Tooltip>
												<div className={styles.port_codes}>
													{!isEmpty(destination_port_code) && (
														<div>{destination_port_code}</div>
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
											const {
												milestone = '', completed_on = null,
											} = val || {};
											return (
												<div key={milestone}>
													<div className={styles.activity_date}>
														<div className={styles.dot} />
														<div className={styles.durations}>
															{format(
																completed_on,
																GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
															)}
															{format(
																completed_on,
																GLOBAL_CONSTANTS.formats.date['dd MMM'],
															)}

														</div>
													</div>
													<div
														className={cl`${styles.milestone_main_card} 
																 ${index
																	=== (filteredMilestoneActivity?.length
																		|| DEFAULT_LENGTH_OF_MILESTONE_ACTIVITY)
																		- REMOVE_LENGTH_OF_MILESTONE_ACTIVITY
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
								{(filteredMilestoneActivity || []).length > MAX_LENGTH_OF_MILESTONE_ACTIVITY && (
									<div
										role="presentation"
										className={styles.show_more}
										onClick={() => handleOnClick(id)}
									>
										<IcMArrowDown
											width={16}
											height={16}
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
