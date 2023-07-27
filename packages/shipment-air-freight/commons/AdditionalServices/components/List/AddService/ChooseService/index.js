import { Pill, Placeholder } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React, { useContext } from 'react';

import FilterService from './FilterServices';
import Price from './Price';
import ServicesList from './ServicesList';
import styles from './styles.module.css';
import tableFields from './tableFields';

function ChooseService({
	shipmentType = '',
	setAddRate = () => {},
	isSeller = false,
	list = [],
	loading = false,
	setFilters = () => {},
	filters = {},
	setShowPrice = () => { },
	refetch = () => { },
	closeModal = () => {},
	serviceCountTotal = 0,
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
			shipmentType={shipmentType}
			item={item}
			setAddRate={setAddRate}
			isSeller={isSeller}
			refetch={refetch}
			setShowPrice={setShowPrice}
			closeModal={closeModal}
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
				<ServicesList fields={fields} data={list} />
			)}
		</div>
	);
}

export default ChooseService;
