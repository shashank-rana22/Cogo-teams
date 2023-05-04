import { Checkbox } from '@cogoport/components';
import React from 'react';

import ServiceTables from '../../common/ServiceTable';
import { serviceMappingConfig } from '../../configurations/mappingslineItems';

function MapLineItemDetails({
	serviceProvider,
	currentSelected,
	handleChange,
}) {
	const renderCheck = (item) => {
		const itemKey = `${item.code}:${item.service_id}`;

		const checkedCondition = currentSelected?.buy?.includes(itemKey);

		return (
			<Checkbox
				checked={checkedCondition}
				onChange={() => (
					handleChange(`${item.code}:${item.service_id}`, 'buy')
				)}
			/>
		);
	};
	return (
		<div>
			<ServiceTables
				service_charges={serviceProvider?.service_charges}
				config={serviceMappingConfig}
				showTotal={false}
				showCargo={false}
				ismappings
				showservice
				renderCheck={renderCheck}
				mappingtable
			/>
		</div>
	);
}

export default MapLineItemDetails;
