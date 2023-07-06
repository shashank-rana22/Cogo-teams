import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import RenderTooltip from '../../../../common/RenderTooltip';

import styles from './styles.module.css';

const SHOW_TOOLTIP_MAX_LENGTH = 16;
const COMMODITY_VALUE_LENGTH = 36;
let MAX_CRITICLITY = 0;
const MAX_CRITICLITY_VALUE = 0;
const RISK_CATEGORIES = {
	1 : 'LOW',
	2 : 'MODERATE',
	3 : 'HIGH',
	4 : 'VERY HIGH',
};
const RISK_CATEGORIES_COLOR = { 1: '#C4DC91', 2: '#FBD1A6', 3: '#F37166', 4: '#ed3726' };
function CardItem({ itemData }) {
	const {
		serial_id = '', origin_port = {}, destination_port = {}, estimated_cargo_value_currency, alarms = [],
		commodity_description = '', cargo_value_currency, cargo_value, estimated_cargo_value,
	} = itemData || {};

	alarms.forEach((item) => {
		if (item.criticality > MAX_CRITICLITY) {
			MAX_CRITICLITY = item.criticality;
		}
	});

	const risk_category = RISK_CATEGORIES[MAX_CRITICLITY];
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
							<RenderTooltip content={display_name} maxLength={SHOW_TOOLTIP_MAX_LENGTH} />
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
							<RenderTooltip
								content={destination_port_display_name}
								maxLength={SHOW_TOOLTIP_MAX_LENGTH}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.right_border}>
				<div className={styles.vr} />
			</div>
			<div className={styles.column2}>
				<h5>Risk Reason</h5>
				{alarms.map((item) => (
					<div className={styles.container_pickup} key={item}>
						<div className={styles.not_picked}>
							{startCase(item?.risk_sub_reason)}
						</div>
					</div>
				))}
			</div>
			<div className={styles.right_border}>
				<div className={styles.vr} />
			</div>
			<div className={styles.column3}>
				<div className={styles.sub_container}>
					{commodity_description
						? (
							<div className={styles.commodity_text}>
								Commodity :
								{' '}
								<RenderTooltip content={commodity_description} maxLength={COMMODITY_VALUE_LENGTH} />
							</div>
						)
						: null}
					{cargo_value && cargo_value_currency
						? (
							<div className={styles.commodity_text}>
								Cargo Value :&nbsp;
								{formatAmount({
									amount   : cargo_value,
									currency : cargo_value_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}

							</div>
						) : null}
					{estimated_cargo_value
						? (
							<div className={styles.commodity_text}>
								Estimated Cargo Value:&nbsp;
								{formatAmount({
									amount   : estimated_cargo_value,
									currency : estimated_cargo_value_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 2,
									},
								})}
							</div>
						)
						: null}
				</div>
				{MAX_CRITICLITY > MAX_CRITICLITY_VALUE ? (
					<div className={styles.ribbons}>
						<div
							className={styles.ribbon}
							style={{ background: RISK_CATEGORIES_COLOR[MAX_CRITICLITY] }}
						>
							{risk_category}

						</div>
					</div>
				) : null}
			</div>

		</div>
	);
}

export default CardItem;
