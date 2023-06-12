import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useState, useContext } from 'react';

import useListAdditionalServices from '../../../../hooks/useListAdditionalServices';
import AddRate from '../../../AdditionalServices/components/AddRate';
import getStaus from '../../../AdditionalServices/components/List/ItemAdded/get_status';

const INITIAL_STATE = 0;

function AdditionsServicesTasks({
	task = {},
	onCancel = () => {},
	refetch = () => {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [addRate, setAddRate] = useState(null);

	const { list = [], loading = true } = useListAdditionalServices({
		shipment_data,
		filters             : { id: task.task_field_id },
		performed_by_org_id : true,
	});

	const serviceListItem = {
		...(list[INITIAL_STATE] || {}),
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
