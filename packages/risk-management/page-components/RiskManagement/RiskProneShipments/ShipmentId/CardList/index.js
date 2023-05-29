import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMPortArrow } from '@cogoport/icons-react';
import React, { useState } from 'react';

import BlDoTimeline from './BlDoTimeline';
import ShipmentTimline from './ShipmentTimeline';
import styles from './styles.module.css';

const MAX_LENGTH = 16;

function CardList({ itemData }) {
	const {
		serial_id = '', origin_port = {}, destination_port = {},
		commodity = '', cargo_value_currency, cargo_value,
	} = itemData || {};
	const { display_name = '', port_code = '' } = origin_port || {};
	const {
		port_code:destination_port_code, display_name:destination_port_display_name,
	} = destination_port || {};
	const [isAccordionActive, setIsAccordionActive] = useState(false);
	const handleClick = () => {
		setIsAccordionActive(!isAccordionActive);
	};

	const renderTooltip = (content, maxLength) => {
		if (content.length > maxLength) {
			return (
				<Tooltip interactive placement="top" content={content} className={styles.tooltip}>
					<div className={styles.value}>{`${content.substring(0, maxLength)}...`}</div>
				</Tooltip>
			);
		}
		return content;
	};
	return (
		<div style={{ marginTop: '16px' }}>
			<div className={styles.div_container}>
				<div
					className={styles.container}

				>
					<div className={styles.column1}>
						<div className={styles.shipment_id_text}>
							#
							{serial_id}
						</div>
						<div className={styles.first_right_border}>
							<div className={styles.vr} />
						</div>
						<div className={styles.booking}>
							<div className={styles.sub_booking}>
								<div className={styles.origin_text}>
									{port_code}
								</div>
								<div className={styles.origin_bottom}>
									{renderTooltip(display_name, MAX_LENGTH)}
								</div>
							</div>
						</div>
						<div className={styles.port_icon}>
							<IcMPortArrow height={20} width={20} />
						</div>
						<div className={styles.booking}>
							<div className={styles.sub_booking}>
								<div className={styles.origin_text}>
									{destination_port_code}
								</div>
								<div className={styles.origin_bottom}>
									{renderTooltip(destination_port_display_name, MAX_LENGTH)}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.right_border}>
						<div className={styles.vr} />
					</div>
					<div className={styles.column2}>
						<div className={styles.container_pickup}>
							<div className={styles.not_picked}>
								Container Not Picked Up
							</div>
							<div className={styles.potential_text}>
								Potential Charge: USD 120
							</div>
						</div>
						<div>
							<div className={styles.not_picked}>
								Container Not Picked Up
							</div>
							<div className={styles.potential_text}>
								Potential Charge: USD 120
							</div>
						</div>
					</div>
					<div className={styles.right_border}>
						<div className={styles.vr} />
					</div>
					<div className={styles.column3}>
						<div className={styles.sub_container}>
							<div className={styles.commodity_text}>
								Commodity :
								{' '}
								{commodity}
							</div>
							<div className={styles.commodity_text}>
								Cargo Value :
								{getFormattedPrice(cargo_value, cargo_value_currency)}

							</div>
						</div>
					</div>
				</div>
				<div className={styles.hr} />

				<div>
					<div style={{
						transition : 'max-height 0.3s ease-in-out',
						maxHeight  : isAccordionActive ? '430px' : '0px',
						overflow   : 'hidden',
					}}
					>
						<ShipmentTimline />
						<BlDoTimeline />
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<div
					className={styles.footer_text}
					onClick={handleClick}
					role="presentation"
				>
					{isAccordionActive ?	'Show Less' : 'Show more' }

				</div>
			</div>

		</div>
	);
}

export default CardList;
