import { Select } from '@cogoport/components';
import { useState, useEffect } from 'react';

import getAvailableRatesDetails from '../../../helpers/getAvailableRatesDetails';
import getFormatedRates from '../../../helpers/getFormatedRates';
import getRecommendation from '../../../helpers/getRecommendation';
import getSellRateDetailPayload from '../../../helpers/getSellRateDetailPayload';
import getSystemFormatedRates from '../../../helpers/getSystemFormatedRates';
import groupSimilarServices from '../../../helpers/groupSimilarServices';
// import useGetShipmentEligibleBookingDocument from '../../../hooks/useGetShipmentEligibleBookingDocument';
import useListRevenueDeskAvailableRates from '../../../hooks/useListRevenueDeskAvailableRates';
import useListShipmentBookingConfirmationPreferences from
	'../../../hooks/useListShipmentBookingConfirmationPreferences';
import { DEFAULT_INDEX, VALUE_ONE } from '../../constants';
import CargoDetailPills from '../../List/Card/Body/CargoDetails/CargoDetailPills';

// import ExistingInventory from './ExistingInventory';
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
	'commodity_description',
];

function SingleService({
	groupedServicesData: servicesData,
	supplierPayload,
	setSupplierPayload,
	// inventory,
	// setInventory,
	priceData,
	setSellRateDetails,
	sellRateDetails,
	rateOptions,
	setRateOptions,
	shipmentData,
	emailModal,
	setEmailModal,
	revenueDeskDecisionsData,
}) {
	const serviceIds = (servicesData || []).map((item) => item.id);
	const groupedServicesData = groupSimilarServices(servicesData);
	const { services_with_preferences_set: servicesWithPreferenceSet = [] } = revenueDeskDecisionsData;
	const [sellRates, setSellRates] = useState({});
	const [selectedService, setSingleServiceData] = useState(groupedServicesData[DEFAULT_INDEX]?.id);
	const singleServiceData = groupedServicesData.find((service) => service.id === selectedService);
	const isPreferenceSet = servicesWithPreferenceSet.includes(singleServiceData?.id);
	const { data: ratesData, loading: ratesLoading } = useListRevenueDeskAvailableRates({
		singleServiceData,
		shipmentData,
		isPreferenceSet,
	});

	const {
		data: allPreferenceCardsData,
		loading: recommendationLoading,
	} = useListShipmentBookingConfirmationPreferences({
		singleServiceData,
		shipmentData,
		isPreferenceRequired: !isPreferenceSet && singleServiceData?.service_type === 'fcl_freight_service',
	});
	// const { data:existingData, loading:existingDataLoading } = useGetShipmentEligibleBookingDocument({
	// 	shipmentData,
	// 	singleServiceData,
	// });

	const OPTIONS = [];
	(groupedServicesData || []).forEach((data) => {
		OPTIONS.push({ label: <CargoDetailPills detail={data} labels={labels} />, value: data?.id });
	});

	useEffect(() => {
		setSingleServiceData(groupedServicesData[DEFAULT_INDEX]?.id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(serviceIds)]);

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

	useEffect(() => {
		if (!recommendationLoading) {
			getRecommendation({
				setSupplierPayload,
				allPreferenceCardsData,
				systemFormatedRates,
				currentFormatedrates,
				singleServiceData,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [recommendationLoading, JSON.stringify(systemFormatedRates), JSON.stringify(currentFormatedrates)]);

	return (
		<div>

			<div style={{ margin: '16px 0' }}>
				{OPTIONS.length > VALUE_ONE && (
					<Select
						options={OPTIONS}
						value={selectedService}
						onChange={(e) => { setSingleServiceData(e); }}
					/>
				)}
			</div>

			<SingleServiceCard
				serviceData={singleServiceData}
				price={priceData?.[singleServiceData?.id]}
				shipmentData={shipmentData}
			/>
			{(isPreferenceSet || ['cancelled', 'completed'].includes(shipmentData?.state)) ? (
				<PreferenceSetServiceData
					singleServiceData={singleServiceData}
					shipmentData={shipmentData}
					isPreferenceSet={isPreferenceSet}
				/>
			) : null}
			{['in_progress', 'confirmed_by_importer_exporter'].includes(shipmentData?.state)
			&& !isPreferenceSet ? (
				<>
					{(supplierPayload?.[singleServiceData?.id] || [])?.length
						? (
							<SelectedRatesCard
								prefrences={supplierPayload?.[singleServiceData?.id]}
								serviceData={singleServiceData}
								setSellRates={setSellRates}
								sellRates={sellRates}
								emailModal={emailModal}
								setEmailModal={setEmailModal}
								singleServiceSellRateDetails={singleServiceSellRateDetails}
								shipmentData={shipmentData}
							/>
						) : null}
					{/* <ExistingInventory
						docs={existingData?.docs}
						loading={existingDataLoading}
						prefrences={inventory}
						setPrefrences={setInventory}
						serviceId={singleServiceData?.id}
					/> */}
					{(rateCardObj || [])?.map((item) => (
						<RatesCard
							type={item?.type}
							ratesData={item?.data}
							key={item?.id}
							prefrences={supplierPayload}
							setPrefrences={setSupplierPayload}
							singleServiceData={singleServiceData}
							setSellRates={setSellRates}
							sellRates={sellRates}
							prefrence_key={item?.prefrence_key}
							loading={ratesLoading}
							shipmentData={shipmentData}
						/>
					))}
				</>
				) : null}
		</div>

	);
}
export default SingleService;
