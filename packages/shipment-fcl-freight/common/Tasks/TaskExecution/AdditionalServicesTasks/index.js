import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useState, useContext } from 'react';

import useListAdditionalServices from '../../../../hooks/useListAdditionalServices';
import AddRate from '../../../AdditionalServices/components/AddRate';
import getStaus from '../../../AdditionalServices/components/List/ItemAdded/get_status';

function AdditionsServicesTasks({
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [addRate, setAddRate] = useState(null);

	const { list = [], loading = true } = useListAdditionalServices({
		payload: { id: task.task_field_id },
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
			task={task}
		/>
	);
}

export default AdditionsServicesTasks;
