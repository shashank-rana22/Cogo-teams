import { Pill, Tooltip, Button } from '@cogoport/components';
import { IcMFcl, IcMPortArrow } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function LiveBookingsListCard() {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div>Booked On : 12 Aug 2023 </div>
				<div>
					Main Service Indicative Price :
					{' '}
					<span className={styles.price_color}>$1200</span>
					{' '}
				</div>
			</div>
			<div className={styles.margin_line} />

			<div className={styles.head}>
				<div className={styles.top_left_details}>
					<div className={styles.service_icon}>
						<div style={{ margin: '5px 5px 0 0' }}><IcMFcl width="20px" height="20px" /></div>
						<div className={styles.service_name}>FCL</div>
					</div>
					<div>
						<Pill size="md" color="orange">
							Import
						</Pill>
					</div>
					<div className={styles.vertical_line} />
					<div>
						<Pill size="md" color="blue">
							Shipment Id : 12345
						</Pill>
					</div>
				</div>
				<div className={styles.pill_container}>
					<div className={styles.pill}>
						<Pill size="md" color="blue">
							20ft
						</Pill>
						<Pill size="md" color="blue">
							1 Container
						</Pill>
						<Pill size="md" color="blue">
							General
						</Pill>
						<Pill size="md" color="blue">
							Inco-FOB
						</Pill>
						<Pill size="md" color="blue">
							18 MT
						</Pill>
						<Pill size="md" color="blue">
							Collect
						</Pill>
					</div>
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.port_details}>
					<div className={styles.row}>
						<Tooltip
							content={(
								<div>
									1234
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										CNSHA
									</p>
									<p>Shanghai , China</p>
								</div>
							</p>
						</Tooltip>
						<IcMPortArrow style={{ margin: '0 100' }} />
						<Tooltip
							content={(
								<div>
									123
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										(INNSA),
									</p>
									<p>
										Jawaharlal Nehru, India
									</p>
								</div>
							</p>
						</Tooltip>
					</div>
				</div>
				<div className={styles.vertical_line} />
				<div className={styles.shipment_details}>
					<div className={styles.content}>
						Cargo Ready :
						<div className={styles.content_value}>29 Aug 2023</div>
					</div>
					<div className={styles.content}>
						Destination Detention Free Days :
						<div className={styles.content_value}>3</div>
					</div>
					<div className={styles.content}>
						BL Type :
						<div className={styles.content_value}>SOB</div>
					</div>
					<div className={styles.content}>
						Commodity Description :
						<div className={styles.content_value}>DSF</div>
					</div>
					<div className={styles.content}>
						Expected Departure :
						<div className={styles.content_value}>31 Aug 2023</div>
					</div>
					<div className={styles.content}>
						Transit Time:
						<div className={styles.content_value}>36 Days</div>
					</div>
					<div className={styles.content}>
						Preferred Shipping :
						<div className={styles.content_value}> Maersk</div>
					</div>
					<div className={styles.content}>
						View More
					</div>
				</div>
			</div>
			<div className={styles.margin_line} />

			<div className={styles.footer}>
				<div className={styles.footer_content}>
					<div className={styles.content}>
						Supplier :
						{' '}
						<span className={styles.content_value}>JS International Korea</span>
					</div>
					<div className={styles.content}>
						Customer :
						<span className={styles.content_value}>Bhilosa Industries Pvt Ltd</span>

					</div>
					<div className={styles.content}>
						Shiping Line :
						<span className={styles.content_value}> N/A</span>

					</div>
					<div className={styles.content}>
						Status :
						<span className={styles.content_value}>Not Reverted</span>
						{' '}
					</div>
				</div>

				<Button size="sm" style={{ marginTop: '5px' }}>Reverted Price</Button>

			</div>
		</div>
	);
}

export default LiveBookingsListCard;
