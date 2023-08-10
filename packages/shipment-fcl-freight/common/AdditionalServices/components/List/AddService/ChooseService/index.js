import { Pill } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import FilterService from './FilterServices';
import Price from './Price';
import ServicesList from './ServicesList';
import tableFields from './tableFields';

function ChooseService({
	setAddRate,
	isSeller,
	list,
	loading,
	setFilters,
	filters,
	setShowPrice = () => { },
	refetch = () => { },
	setShowChargeCodes = () => {},
	serviceCountTotal,
}) {
	const tagDisplay = (item) => (
		<div>
			{item?.tags ? (
				<Pill className="primary">{startCase(item?.tags?.[GLOBAL_CONSTANTS.zeroth_index])}</Pill>
			) : null}
		</div>
	);

	const { shipment_data } = useContext(ShipmentDetailContext);

	const priceRequest = (item) => (
		<Price
			item={item}
			setAddRate={setAddRate}
			isSeller={isSeller}
			refetch={refetch}
			setShowPrice={setShowPrice}
			setShowChargeCodes={setShowChargeCodes}
		/>
	);

	const countObj = { listCount: list.length, total: serviceCountTotal };

	const fields = tableFields(priceRequest, countObj, tagDisplay);

	const services = (shipment_data?.services || []
	).filter((e) => e !== 'cargo_insurance_service');

	const serviceOptions = (services || []
	).map((service) => ({ label: startCase(service), value: service }));

	return (
		<div>
			<FilterService
				setFilters={setFilters}
				filters={filters}
				uniqueServices={serviceOptions}
			/>

			<ServicesList fields={fields} data={list} loading={loading} />
		</div>
	);
}

export default ChooseService;
