import { Pill } from '@cogoport/components';
import React from 'react';

import renderValue from './RenderValue/index';

const labels = [
	'airline',
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'price_type',
	'is_minimum_price_shipment',
	'master_airway_bill_number',
	'house_airway_bill_number',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'lr_number',
	'payment_term',
	'container_load_type',
	'contract_reference_id',
	'awb_execution_date',
	'truck_types',
	'bl_category',
];

function CargoDetailPills({ detail = {} }) {
	const isFTL = detail?.shipment_type === 'ftl_freight';
	const COMMODITY = 'commodity';

	return (
		<>
			{labels.map((label) => {
				if (label === COMMODITY && !detail?.[label] && isFTL) {
					return (
						<Pill key={label}>
							General
						</Pill>
					);
				}

				if (detail?.[label] && renderValue(label, detail)) {
					return (
						<Pill key={label}>
							{renderValue(label, detail)}
						</Pill>
					);
				}

				return null;
			})}
		</>
	);
}

export default CargoDetailPills;
