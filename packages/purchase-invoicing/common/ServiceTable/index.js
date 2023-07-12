import { startCase } from '@cogoport/utils';
import React from 'react';

import { serviceConfig } from '../../configurations/serviceconfig';
import { IS_MAIN_SERVICE } from '../../constants';
import getFormattedAmount from '../helpers/formatAmount';

import RenderCargoPills from './RenderCargoPills';
import SingleColumn from './SingleColumn';
import styles from './styles.module.css';

const DEFAULT_SPAN_VALUE = 1;
const TOTAL_SPAN = 12;
const TOTAL_WIDTH = 100;
const DEFAULT_PRICE_VALUE = 0;
function ServiceTables({
	service_charges,
	config,
	showTotal = true,
	showCargo = true,
	showservice,
	ismappings,
	renderCheck,
	mappingtable = false,
	shipment_data = {},
}) {
	return ((service_charges || []).map((singlecharge) => {
		let trade_type = '';
		if (singlecharge?.trade_type === 'export') {
			trade_type = 'Origin';
		} else if (singlecharge?.trade_type === 'import') {
			trade_type = 'Destination';
		}

		const parentServiceName = shipment_data?.shipment_type === 'air_freight'
					&& singlecharge?.service_type === 'subsidiary_service'
					&& singlecharge?.detail?.service_type
			? `(${startCase(singlecharge?.detail?.primary_service_type)})`
			: '';

		const isFTL = singlecharge?.service_type === 'ftl_freight_service'
					&& singlecharge?.detail?.truck_number;

		const otherService = isFTL
			? `Truck Number: ${startCase(singlecharge?.detail?.truck_number)}`
			: `${trade_type} ${startCase(singlecharge?.service_type)} ${parentServiceName}`;

		const service = IS_MAIN_SERVICE.includes(singlecharge?.service_type)
			? startCase(singlecharge?.service_type)
			: otherService;
		const lineItems = singlecharge?.line_items || [];

		const formatLineItems = lineItems.map((litem) => ({
			...litem,
			service_id   : singlecharge?.service_id,
			service_type : singlecharge?.service_type,
		}));

		return (
			<div className={styles.servicecontainer} key={singlecharge?.id}>
				{showCargo ? (
					<div className={styles.marginleft}>
						<RenderCargoPills item={singlecharge} />
					</div>
				) : null}
				{showservice ? <div className={styles.serviceheadercolor}>{service}</div> : null}
				<div className={styles.flextable}>
					<div className={styles.tableheader}>
						{((config || serviceConfig(service))).map((field) => (
							<div
								style={{
									flex  : (field.span || DEFAULT_SPAN_VALUE),
									width : `${((field.span || DEFAULT_SPAN_VALUE) * (TOTAL_WIDTH / TOTAL_SPAN))}px`,
								}}
								className={styles.fieldstyle}
								key={field.key || field.label}
							>
								{field.label}
							</div>
						))}
					</div>
					{formatLineItems.map((lineitem) => (
						<SingleColumn
							lineitem={lineitem}
							fields={config || serviceConfig(service)}
							ismappings={ismappings}
							renderCheck={renderCheck}
							mappingtable={mappingtable}
							key={lineitem?.code}
						/>
					))}
					{showTotal ? (
						<div className={styles.totalamount}>
							Total With TAX
							<span className={styles.amount}>
								{getFormattedAmount(
									singlecharge?.tax_total_price || DEFAULT_PRICE_VALUE,
									singlecharge?.currency,
								)}
							</span>
						</div>
					) : null}
				</div>
			</div>
		);
	})
	);
}

export default ServiceTables;
