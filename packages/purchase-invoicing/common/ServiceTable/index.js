import { startCase } from '@cogoport/utils';
import React from 'react';

import { serviceConfig } from '../../configurations/serviceconfig';
import { isMainService } from '../../constants';
import getFormattedAmount from '../helpers/formatAmount';

import CargoDetails from './CargoDetails';
import SingleColumn from './SingleColumn';
import styles from './styles.module.css';

function ServiceTables({
	service_charges,
	config,
	showTotal = true,
	showCargo = true,
	showservice,
	ismappings,
	renderCheck,
	mappingtable,
}) {
	return (
		<>
			{(service_charges || []).map((singlecharge) => {
				let trade_type = '';
				if (singlecharge?.trade_type === 'export') {
					trade_type = 'Origin';
				} else if (singlecharge?.trade_type === 'import') {
					trade_type = 'Destination';
				}
				const isFTL = singlecharge?.service_type === 'ftl_freight_service'
                    && singlecharge?.detail?.truck_number;

				const otherService = isFTL
					? `Truck Number: ${startCase(singlecharge?.detail?.truck_number)}`
					: `${trade_type} ${startCase(singlecharge?.service_type)}`;

				const service = isMainService.includes(singlecharge?.service_type)
					? startCase(singlecharge?.service_type)
					: otherService;
				const lineItems = singlecharge?.line_items || [];

				const formatLineItems = lineItems.map((litem) => ({
					...litem,
					service_id   : singlecharge?.service_id,
					service_type : singlecharge?.service_type,
				}));

				return (
					<div className={styles.servicecontainer}>
						{showCargo && (
							<div style={{ marginLeft: '4px' }}>
								<CargoDetails />
							</div>
						)}
						{showservice && <div className={styles.serviceheader}>{service}</div>}
						<div className={styles.flextable}>
							<div className={styles.tableheader}>
								{((config || serviceConfig(service))).map((field) => (
									<div
										style={{
											flex  : (field.span || 1),
											width : `${((field.span || 1) * (100 / 12))}px`,
										}}
										className={styles.fieldstyle}
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
								/>
							))}
							{showTotal && (
								<div className={styles.totalamount}>
									Total With TAX
									<span className={styles.amount}>
										{getFormattedAmount(singlecharge?.tax_total_price || 0, singlecharge?.currency)}
									</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</>
	);
}

export default ServiceTables;
