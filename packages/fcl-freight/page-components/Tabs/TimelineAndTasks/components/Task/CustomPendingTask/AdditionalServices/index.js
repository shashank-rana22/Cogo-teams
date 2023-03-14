import React, { useState } from 'react';
import AddRate from '../../../../../AdditionalServices/components/AddRate';
import useList from '../../../../../AdditionalServices/components/List/useAddedList';
import getStaus from '../../../../../AdditionalServices/components/List/ItemAdded/get_status';

const AdditionsService = ({
	task = {},
	shipment_data,
	Loader,
	onCancel = () => {},
	refetch = () => {},
}) => {
	const [addRate, setAddRate] = useState(null);

	const { list, loading } = useList({
		shipment_data,
		shipment_id: shipment_data.id,
		filters: { id: task.task_field_id },
		performed_by_org_id: true,
	});

	const item = {
		...(list[0] || {}),
	};

	return loading ? (
		Loader
	) : (
		<AddRate
			item={item}
			shipment_data={shipment_data}
			status={getStaus({ item })}
			addRate={addRate}
			setAddRate={setAddRate}
			showLabel={false}
			onCancel={onCancel}
			refetch={refetch}
		/>
	);
};

export default AdditionsService;
