import { getFormattedPrice } from '@cogoport/forms';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import renderTooltip from '../../../../common/renderTooltip';

import styles from './styles.module.css';

const MAX_LENGTH = 16;
const COMMODITY_VALUE_LENGTH = 40;
const RISK_CATEGORIES = {
	1 : 'LOW',
	2 : 'MODERATE',
	3 : 'HIGH',
	4 : 'VERY HIGH',
};
const RISK_CATEGORIES_COLOR = { 1: '#C4DC91', 2: '#FBD1A6', 3: '#F37166', 4: '#ed3726' };
function CardItem({ itemData }) {
	const {
		serial_id = '', origin_port = {}, destination_port = {},
		commodity = '', cargo_value_currency, cargo_value, reason = [],
		criticality = '',
	} = itemData || {};

	const risk_category = RISK_CATEGORIES[criticality];
	const { display_name = '', port_code = '' } = origin_port || {};
	const {
		port_code:destination_port_code, display_name:destination_port_display_name,
	} = destination_port || {};

	return (
		<div className={styles.container}>

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
				{reason.map((item) => (
					<div className={styles.container_pickup} key={item}>
						<div className={styles.not_picked}>
							{startCase(item)}
						</div>
					</div>
				))}
			</div>
			<div className={styles.right_border}>
				<div className={styles.vr} />
			</div>
			<div className={styles.column3}>
				<div className={styles.sub_container}>
					<div className={styles.commodity_text}>
						Commodity :
						{' '}
						{renderTooltip(commodity || '-', COMMODITY_VALUE_LENGTH)}
					</div>
					<div className={styles.commodity_text}>
						Cargo Value :
						{getFormattedPrice(cargo_value, cargo_value_currency) || ' -'}

					</div>
				</div>
				{criticality && (
					<div className={styles.ribbons}>
						<div
							className={styles.ribbon}
							style={{ background: RISK_CATEGORIES_COLOR[criticality] }}
						>
							{risk_category}

						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default CardItem;
