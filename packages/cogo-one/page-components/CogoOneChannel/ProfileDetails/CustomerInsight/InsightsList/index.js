import { Pill, Tooltip } from '@cogoport/components';
import { IcMPort } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';

import BookingContent from './BookingContent';
import styles from './styles.module.css';

function InsightsList({ checkEmpty, shipment_and_spot_search_stats, total_messages }) {
	return (
		checkEmpty
			? <EmptyState type="insights" /> : (
				<>
					{Object.keys(shipment_and_spot_search_stats).map((key) => {
						const {
							shipment_insights = {},
							last_shipment_data = {},
						} = shipment_and_spot_search_stats[key];
						const {
							importer_exporter = {}, commodity = '', trade_type = '',
							shipping_line = {}, serial_id, created_at = '',

						} = last_shipment_data || {};
						const { list = [], total_shipments } = shipment_insights || {};

						function toolTip(item) {
							return (
								<div className={styles.tooltip_content}>
									{startCase(item?.origin_country_name)}
									,
									{' '}
									{startCase(item?.origin_port_name)}
								</div>
							);
						}

						return (

							<div className={styles.organisation_div}>
								<div className={styles.business_name}>
									{importer_exporter?.business_name}
								</div>
								<div className={styles.stats_div}>
									<div className={styles.top}>
										<div className={styles.content}>
											<div className={styles.text}>Total Bookings</div>
											<div className={styles.header}>
												{total_shipments}
											</div>
										</div>
										<div className={styles.content}>
											<div className={styles.text}>Total Communication </div>
											<div className={styles.header}>
												{total_messages}
											</div>
										</div>
									</div>
								</div>

								{!isEmpty(last_shipment_data) && (
									<div className={styles.booking_div}>
										<div className={styles.last_booking}>
											Last Booking :
											<div className={styles.sid_number}>
												{' '}
												SID
												{' '}
												{serial_id}
											</div>
										</div>
										<BookingContent
											last_shipment_data={last_shipment_data}
											trade_type={trade_type}
											shipping_line={shipping_line}
											created_at={created_at}
										/>
									</div>
								)}

								{!isEmpty(commodity) && (
									<>
										<div className={styles.comm_tex}>Commodity</div>
										<div>
											<Pill
												key="Live animals"
												size="sm"
												color="#FBD1A6"
											>
												{startCase(commodity)}
											</Pill>
										</div>
									</>
								)}

								{!isEmpty(list) && (
									<>
										<div className={styles.comm_tex}>Port pairs most booked on</div>
										<div className={styles.port_div}>
											{(list || []).map((item) => (
												<div className={styles.div_top}>
													<div className={styles.origin_container}>

														<Tooltip
															content={toolTip(item)}
															placement="bottom"
														>
															<div className={styles.origin}>
																{startCase(item?.origin_country_name)}
																,
																{startCase(item?.origin_port_name)}

															</div>
														</Tooltip>

														<Tooltip
															content="Shipments Count"
															placement="bottom"
														>
															<div className={styles.shipment_count}>
																{item?.shipments_count}
															</div>
														</Tooltip>
													</div>
													<IcMPort width={15} height={15} fill="#ACDADF" />
													<Tooltip
														content={toolTip(item)}
														placement="bottom"
													>
														<div className={styles.origin}>
															{startCase(item?.destination_country_name)}
															,
															{startCase(item?.destination_port_name)}
														</div>
													</Tooltip>
												</div>
											))}
										</div>
									</>
								)}
							</div>
						);
					})}
				</>
			)
	);
}

export default InsightsList;
