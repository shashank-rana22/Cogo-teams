import { Pill, Placeholder } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import FilterService from './FilterServices';
import Price from './Price';
import ServicesList from './ServicesList';
import styles from './styles.module.css';
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
				<Pill className="primary">{startCase(item?.tags?.[0])}</Pill>
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

	const serviceOptions = (shipment_data?.services || []
	).map((service) => ({ label: startCase(service), value: service }));

	return (
		<div>
			<FilterService
				setFilters={setFilters}
				filters={filters}
				uniqueServices={serviceOptions}
			/>

			{loading ? (
				<div className={styles.loading_container}>
					<Placeholder height="50px" width="100%" />
					<Placeholder height="50px" width="100%" margin="8px 0" />
					<Placeholder height="50px" width="100%" margin="8px 0" />
					<Placeholder height="50px" width="100%" margin="8px 0" />
					<Placeholder height="50px" width="100%" />
				</div>
			) : (
				<ServicesList fields={fields} data={list} loading={loading} />
			)}
		</div>
	);
}

export default ChooseService;
