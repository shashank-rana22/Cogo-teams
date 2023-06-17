import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import getAvailableRatesDetails from '../../../helper/getAvailableRatesDetails';
import getFormatedRates from '../../../helper/getFormatedRates';
import getSellRateDetailPayload from '../../../helper/getSellRateDetailPayload';
import getSystemFormatedRates from '../../../helper/getSystemFormatedRates';
import useListRevenueDeskAvailableRates from '../../../hooks/useListRevenueDeskAvailableRates';
import CargoDetailPills from '../../List/Card/Body/CargoDetails/CargoDetailPills';

import ExistingInventory from './ExistingInventory';
import PreferenceSetServiceData from './PreferenceSetServiceData';
import RatesCard from './RatesCard';
import SelectedRatesCard from './SelectedRatesCard';
import SingleServiceCard from './SingleServiceCard';

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
	priceData,
	setSellRateDetails,
	sellRateDetails,
	rateOptions,
	setRateOptions,
	shipmentData,
}) {
	const [sellRates, setSellRates] = useState({});
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

	const currentFormatedrates = getFormatedRates('current', ratesData?.flashed_rates, singleServiceData);
	const systemFormatedRates = getSystemFormatedRates(ratesData?.system_rates, singleServiceData);
	const availableRatesForRD = getAvailableRatesDetails({ currentFormatedrates, systemFormatedRates });
	useEffect(() => {
		setRateOptions({ ...rateOptions, [singleServiceData?.id]: availableRatesForRD });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(availableRatesForRD)]);

	const singleServiceSellRateDetails = getSellRateDetailPayload({
		currentFormatedrates,
		systemFormatedRates,
		service_providers: supplierPayload?.[singleServiceData?.id],
		sellRates,
	});

	useEffect(() => {
		setSellRateDetails({ ...sellRateDetails, [singleServiceData?.id]: singleServiceSellRateDetails });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(singleServiceSellRateDetails)]);
	const rateCardObj = [
		{
			prefrence_key : 'system',
			type          : 'System Rates',
			data          : systemFormatedRates?.rows,
		},
		{
			prefrence_key : 'current',
			type          : 'Rates from Current Flash Alerts',
			data          : currentFormatedrates?.rows,
		},
	];
	return (
		<div>

			<div style={{ margin: '16px 0' }}>
				{options.length > 2 && (
					<Select
						options={options}
						value={singleServiceData}
						onChange={(e) => { setSingleServiceData(e); }}
					/>
				)}
			</div>

			<SingleServiceCard serviceData={singleServiceData} price={priceData?.[singleServiceData?.id]} />
			{singleServiceData?.is_preference_set ? (
				<PreferenceSetServiceData
					singleServiceData={singleServiceData}
					price={priceData?.[singleServiceData?.id]}
					shipmentData={shipmentData}
				/>
			) : (
				<>
					{(supplierPayload?.[singleServiceData?.id] || []).length
						? (
							<SelectedRatesCard
								prefrences={supplierPayload?.[singleServiceData?.id]}
								price={priceData?.[singleServiceData?.id]}
								serviceData={singleServiceData}
								setSellRates={setSellRates}
								sellRates={sellRates}
							/>
						) : null}
					<ExistingInventory
						docs={ratesData?.eligible_booking_document?.docs}
						loading={ratesLoading}
						prefrences={inventory}
						setPrefrences={setInventory}
						serviceId={singleServiceData?.id}
					/>
					{rateCardObj.map((item) => (
						<RatesCard
							type={item?.type}
							ratesData={item?.data}
							key={item}
							prefrences={supplierPayload}
							setPrefrences={setSupplierPayload}
							serviceData={singleServiceData}
							setSellRates={setSellRates}
							sellRates={sellRates}
							prefrence_key={item?.prefrence_key}
						/>
					))}
				</>
			)}
		</div>

	);
}
export default SingleService;
