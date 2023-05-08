import { Checkbox } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import ServiceTables from '../../common/ServiceTable';
import { serviceMappingConfig } from '../../configurations/mappingslineItems';

function MapLineItemDetails({
	serviceProvider,
	currentSelected,
	handleChange,
	isLockedMode,
	collectionPartyObj,
}) {
	let bankDetails = [];
	if (!isEmpty(collectionPartyObj?.bank_details)) {
		bankDetails = (collectionPartyObj?.bank_details || []).filter(
			(item) => item?.bank_account_number === collectionPartyObj?.selectedAccNo,
		);
	} else if (!isEmpty(collectionPartyObj?.documents)) {
		bankDetails = (collectionPartyObj?.documents || []).filter(
			(item) => item?.data?.bank_account_number === collectionPartyObj?.selectedAccNo
				&& ['pending', 'verified'].includes(item?.verification_status)
				&& item?.status === 'active'
				&& item?.document_type === 'bank_account_details',
		);
	}

	const bankStatus = bankDetails?.[0]?.verification_status;

	const disableEditing = isLockedMode || bankStatus === 'pending';
	const renderCheck = (item) => {
		const itemKey = `${item.code}:${item.service_id}`;

		const checkedCondition = currentSelected?.buy?.includes(itemKey);

		return (
			<Checkbox
				checked={checkedCondition}
				disabled={disableEditing}
				onChange={() => (!disableEditing
					? handleChange(`${item.code}:${item.service_id}`, 'buy')
					: null)}
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
