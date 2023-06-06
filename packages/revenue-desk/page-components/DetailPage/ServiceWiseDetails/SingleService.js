import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import getSupplierPrefrencePayload from '../../../helper/getSupplierPreferencePayload';
import useListRevenueDeskAvailableRates from '../../../hooks/useListRevenueDeskAvailableRates';
import CargoDetailPills from '../../List/Card/Body/CargoDetails/CargoDetailPills';

import ExistingInventory from './ExistingInventory';
import RatesCard from './RatesCard';
import SelectedRatesCard from './SelectedRatesCard';

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

function SingleService({
	groupedServicesData,
	supplierPayload,
	setSupplierPayload,
	inventory,
	setInventory,
}) {
	const [prefrences, setPrefrences] = useState([]);
	const [existingInventory, setExistingInventory] = useState([]);

	const [singleServiceData, setSingleServiceData] = useState(groupedServicesData[0]);
	const { data: ratesData, loading: ratesLoading } = useListRevenueDeskAvailableRates({ singleServiceData });

	const options = [];
	(groupedServicesData || []).forEach((data) => {
		options.push({ label: <CargoDetailPills detail={data} labels={labels} />, value: data });
	});

	useEffect(() => {
		setSingleServiceData(groupedServicesData[0]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(groupedServicesData)]);

	const rateCardObj = [
		{
			prefrence_key : 'system',
			type          : 'System Rates',
			data          : ratesData?.system_rates,
		},
		{
			prefrence_key : 'current',
			type          : 'Rates from Current Flash Alerts',
			data          : ratesData?.flashed_rates,
		},
	];

	const { service_providers = [] } = getSupplierPrefrencePayload({
		currentRates : ratesData?.flashed_rates?.list,
		systemRates  : ratesData?.system_rates,
		prefrences,
	});

	useEffect(() => {
		setSupplierPayload({
			...supplierPayload,
			[singleServiceData?.id]:
            service_providers || [],
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(prefrences)]);

	useEffect(() => {
		setInventory({ ...inventory, [singleServiceData?.id]: existingInventory });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(existingInventory)]);
	return (
		<div>
			{prefrences?.length !== 0 && <SelectedRatesCard prefrences={prefrences} />}

			<ExistingInventory
				docs={ratesData?.eligible_booking_document?.docs}
				loading={ratesLoading}
				prefrences={existingInventory}
				setPrefrences={setExistingInventory}
			/>
			{rateCardObj.map((item) => (
				<RatesCard
					ratesData={item}
					key={item}
					prefrences={prefrences}
					setPrefrences={setPrefrences}
					prefrence_key={item?.prefrence_key}
				/>
			))}
		</div>

	);
}
export default SingleService;
