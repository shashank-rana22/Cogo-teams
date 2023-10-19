import { Tooltip } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getLocationInfo from '../../../../../utilis/locations-search';
import CargoDetails from '../CargoDetails';
import styles from '../styles.module.css';

function ViewMoreServices({ serviceList = [], customer_name = null }) {
	return (
		<div>
			{isEmpty(serviceList) ? 'No Data Found'
				: (
					<div className={styles.pop_container}>
						{customer_name ? (
							<div className={styles.heading}>
								Customer :
								{' '}
								{customer_name}
							</div>
						) : null}
						{(serviceList || []).map((service) => {
							const { origin, destination } = getLocationInfo(
								service,
								'service_type',
							);
							let displayService = service?.service_type;
							if (service.trade_type === 'export') {
								displayService = ` Origin ${displayService}`;
							}
							if (service.trade_type === 'import') {
								displayService = ` Destination ${displayService}`;
							}
							return (
								<div className={styles.item} key={service.id}>
									<div className={styles.heading}>{startCase(displayService)}</div>
									<div className={styles.row}>
										<div className={styles.label}>
											{destination ? 'Path -' : 'Location -'}
										</div>
										<div>
											<Tooltip
												placement="bottom"
												theme="light"
												content={
													<div style={{ fontSize: '10px' }}>{origin?.name}</div>
									}
											>
												<div className={styles.location_wrapper}>
													<div className={styles.port_code}>
														{origin?.port_code || origin?.postal_code}
													</div>
													<div className={styles.label}>{origin?.name}</div>
												</div>
											</Tooltip>
										</div>
										{destination ? (
											<>
												<div style={{ margin: '0 16px' }}> --&gt;&gt; </div>
												<div>
													<Tooltip
														placement="bottom"
														theme="light"
														content={(
															<div style={{ fontSize: '10px' }}>
																{destination?.name}
															</div>
														)}
													>
														<div className={styles.location_wrapper}>
															<div className={styles.port_code}>
																{destination?.port_code || destination?.postal_code}
															</div>
															<div className={styles.label}>
																{destination?.name}
																{' '}
															</div>
														</div>
													</Tooltip>
												</div>
											</>
										) : null}
									</div>
									<div className={styles.flex}>
										<CargoDetails primary_service={service} />
									</div>
								</div>
							);
						})}
					</div>
				)}
		</div>

	);
}

export default ViewMoreServices;
