import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';



import SelectedCards from './SelectedCards';
import CargoDetailPills from '../../../../List/Card/Body/CargoDetails/CargoDetailPills';

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

function PreviewSelectedCards({ supplierPayload, groupedServicesData, price, shipmentType }) {
	const [singleServiceData, setSingleServiceData] = useState(groupedServicesData[0]);
	const options = [];
	(groupedServicesData || []).forEach((data) => {
		options.push({ label: <CargoDetailPills detail={data} labels={labels} />, value: data });
	});

	useEffect(() => {
		setSingleServiceData(groupedServicesData[0]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(groupedServicesData)]);
	return (
		<div>
			<div style={{ marginTop: '16px' }}>
				<Select
					options={options}
					value={singleServiceData}
					onChange={(e) => { setSingleServiceData(e); }}
				/>
			</div>
			{(supplierPayload?.[singleServiceData?.id] || []).length
				? (
					<SelectedCards
						prefrences={supplierPayload?.[singleServiceData?.id]}
						price={price}
						shipmentType={shipmentType}
					/>
				) : null}
		</div>
	);
}
export default PreviewSelectedCards;
