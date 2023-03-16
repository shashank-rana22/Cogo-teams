import Pill from '@cogoport/components';
import startCase from '@cogoport/utils';
import React, { useContext } from 'react';

import { ShipmentDetailContext } from '@cogoport/context';

import FilterService from './FilterServices';
import { getOtherServiceOptions } from './getOptions';
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
	setShow = () => { },
	refetch = () => { },
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
			setShow={setShow}
			refetch={refetch}
			setShowPrice={setShowPrice}
			shipment_type={shipment_data?.shipment_type}
		/>
	);

	const countObj = { listCount: list.length, total: serviceCountTotal };

	const fields = tableFields(priceRequest, countObj, tagDisplay);

	// let serviceOptions = (shipment_data?.services || []).map((service) => ({ label: startCase(service), value: service }));

	// serviceOptions = getOtherServiceOptions({
	// 	shipment_data,
	// 	serviceOptions,
	// 	startCase,
	// });

	return (
		<div className={styles.container}>
			Choose Service
			{/* <FilterService
				setFilters={setFilters}
				filters={filters}
				uniqueServices={serviceOptions}
			/>

			{loading ? (
				<LoadingContainer>
					{Array(5)
						.fill('')
						.map(() => (
							<CustomSkeleton />
						))}
				</LoadingContainer>
			) : (
				<ServicesList fields={fields} data={list} loading={loading} />
			)} */}
		</div>
	);
}

export default ChooseService;
