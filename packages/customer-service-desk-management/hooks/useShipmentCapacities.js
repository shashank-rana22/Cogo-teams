import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import services from '../configurations/service-options';

import useCreateShipmentCapacities from './useCreateShipmentCapacities';

const useShipmentCapacities = ({ data = {}, setActiveItem = () => {}, source = '' }) => {
	const {
		loading: createShipmentLoading,
		createShipmentCapacities,
	} = useCreateShipmentCapacities({ setActiveItem, source });

	const { control, formState: { errors }, handleSubmit, setValue, getValues } = useForm();

	const handleReset = useCallback(() => {
		const registeredFieldNames = Object.keys(getValues());

		registeredFieldNames.forEach((fieldName) => {
			setValue(fieldName, '');
		});
	}, [getValues, setValue]);

	useEffect(() => {
		if (isEmpty(data.shipment_capacities)) {
			handleReset();
			return;
		}

		const serviceWiseData = services?.map((service) => {
			const filteredData = data.shipment_capacities?.filter((item) => ((item.service_transit_type
				? `${item.service_type}-${item.service_transit_type}` : item.service_type) === service.value)) || [];

			return {
				service : service.value,
				data    : filteredData.sort((a, b) => a.slab_lower_limit - b.slab_lower_limit),
			};
		});

		serviceWiseData.forEach((item) => {
			const serviceValue = item.service;

			item.data.forEach((subItem, index) => {
				setValue(`${index}-${serviceValue}`, subItem.shipment_capacity);
			});
		});
	}, [data, handleReset, setValue]);

	return {
		control,
		errors,
		handleSubmit,
		handleReset,
		createShipmentLoading,
		createShipmentCapacities,
	};
};

export default useShipmentCapacities;
