import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { DEFAULT_INDEX, VALUE_ONE } from '../../../../constants';
import CargoDetailPills from '../../../../List/Card/Body/CargoDetails/CargoDetailPills';

import SelectedCards from './SelectedCards';

const labels = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'price_type',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
	'destination_cargo_handling_type',
	'truck_type',
	'trip_type',
	'payment_term',
	'container_load_type',
	'contract_reference_id',
	'awb_execution_date',
	'truck_types',
];

function PreviewSelectedCards({ supplierPayload, groupedServicesData, shipmentType }) {
	const [singleServiceData, setSingleServiceData] = useState(groupedServicesData[DEFAULT_INDEX]);
	const OPTIONS = [];
	(groupedServicesData || []).forEach((data) => {
		OPTIONS.push({ label: <CargoDetailPills detail={data} labels={labels} />, value: data });
	});

	useEffect(() => {
		setSingleServiceData(groupedServicesData[DEFAULT_INDEX]);
	}, [groupedServicesData]);
	return (
		<div>
			<div style={{ marginTop: '16px' }}>
				{OPTIONS.length > VALUE_ONE && (
					<Select
						options={OPTIONS}
						value={singleServiceData}
						onChange={(e) => { setSingleServiceData(e); }}
					/>
				)}
			</div>
			{(supplierPayload?.[singleServiceData?.id] || []).length
				? (
					<SelectedCards
						prefrences={supplierPayload?.[singleServiceData?.id]}
						shipmentType={shipmentType}
					/>
				) : null}
		</div>
	);
}
export default PreviewSelectedCards;
