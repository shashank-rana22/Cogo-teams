import { Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const SERVICES = [
	{ label: 'FCL', value: 'fcl_freight' },
	{ label: 'LCL', value: 'lcl_freight' },
	{ label: 'AIR International', value: 'air_freight' },
	{ label: 'AIR Domestic', value: 'domestic_air_freight' },
	{ label: 'AIR Customs', value: 'air_customs' },
	{ label: 'FCL Customs', value: 'fcl_customs' },
	{ label: 'LCL Customs', value: 'lcl_customs' },
	{ label: 'FTL', value: 'ftl_freight' },
	{ label: 'LTL', value: 'ltl_freight' },
	{ label: 'Haulage Freight', value: 'haulage_freight' },
	{ label: 'Trailer Freight', value: 'trailer_freight' },
	{ label: 'FCL Locals', value: 'fcl_freight_local' },
];

function ExtraFilters({
	serviceType,
	setFilters,
	setServiceType,
	type,
}) {
	return (
		<div className={styles.container}>
			{type !== 'allocation_requests' ? (
				<div className={styles.service_select}>
					<Select
						placeholder="Select Service"
						style={{ marginRight: 8 }}
						size="sm"
						value={serviceType}
						onChange={(val) => {
							setServiceType(val);
							setFilters((previousFilters) => ({ ...previousFilters, page: 1 }));
						}}
						options={SERVICES}
						isClearable
					/>
				</div>
			) : null}

		</div>
	);
}

export default ExtraFilters;
