import { useState, useEffect } from 'react';

import getSupplierPrefrencePayload from '../../../helper/getSupplierPreferencePayload';
import useListRevenueDeskAvailableRates from '../../../hooks/useListRevenueDeskAvailableRates';

import ExistingInventory from './ExistingInventory';
import RatesCard from './RatesCard';
import SelectedRatesCard from './SelectedRatesCard';

function SingleService({
	activeTab,
	groupedShowServicesData,
	supplierPayload,
	setSupplierPayload,
	inventory,
	setInventory,
}) {
	const [prefrences, setPrefrences] = useState([]);
	const [existingInventory, setExistingInventory] = useState([]);
	const singleServiceData = groupedShowServicesData[activeTab][0];
	const { data: ratesData, loading: ratesLoading } = useListRevenueDeskAvailableRates({ singleServiceData });

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
