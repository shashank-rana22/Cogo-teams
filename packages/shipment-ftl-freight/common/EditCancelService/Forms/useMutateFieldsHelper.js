import { useState, useEffect } from 'react';

const useMutateFieldsHelper = ({
	type = '',
	truckList = [],
	fields = [],
	watch = () => {},
}) => {
	const [fieldArrIndex, setFieldArrIndex] = useState(0);
	const newFields = fields;
	const formValues = watch();

	if (type === 'truck_number') {
		const organization_id = (truckList || []).find(
			(item) => item.id === formValues.service_data[fieldArrIndex]?.service_id,
		)?.service_provider_id;

		newFields?.[0].controls.forEach((item) => {
			const newItem = item;
			if (newItem?.name === 'service_id') {
				newItem.options = truckList;
			}

			if (newItem?.name === 'truck_number') {
				newItem.params = {
					filters: {
						organization_id,
						status: 'active',
					},
				};
			}
		});
	}

	useEffect(() => {
		const subscription = watch((value, { name, type: newtype }) => {
			if (type !== 'truck_number') return;
			let index;
			if (newtype === 'change') {
				index = name?.split('.')?.[1];
			} else {
				index = (value?.service_data?.length || 0) - 1;
			}
			setFieldArrIndex(index);
		});
		return () => subscription.unsubscribe();
	}, [watch, type]);

	return {
		newFields,
	};
};

export default useMutateFieldsHelper;
