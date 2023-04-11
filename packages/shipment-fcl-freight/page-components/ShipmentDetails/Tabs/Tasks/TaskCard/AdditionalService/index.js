import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import AddRate from '../../../../../../common/AdditionalServices/components/AddRate';
import getStaus from '../../../../../../common/AdditionalServices/components/List/ItemAdded/get_status';
import useListAdditionalServices from '../../../../../../hooks/useListAdditionalServices';

function AdditionsService({
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [addRate, setAddRate] = useState(null);

	const { list, loading } = useListAdditionalServices({
		shipment_data,
		filters             : { id: task.task_field_id },
		performed_by_org_id : true,
	});

	const serviceListItem = {
		...(list[0] || {}),
	};

	return loading ? (
		<Loader />
	) : (
		<AddRate
			item={serviceListItem}
			shipment_data={shipment_data}
			status={getStaus({ serviceListItem })}
			addRate={addRate}
			setAddRate={setAddRate}
			showLabel={false}
			onCancel={onCancel}
			refetch={refetch}
			source="task"
		/>
	);
}

export default AdditionsService;
