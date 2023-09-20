import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import services from '../configurations/service-options';

import useCreateShipmentCapacities from './useCreateShipmentCapacities';

const useShipmentCapacities = ({ data = {}, setActiveItem = () => {}, source = '' }) => {
	const {
		loading: createShipmentLoading,
		createShipmentCapacities,
	} = useCreateShipmentCapacities({ data, setActiveItem, source });

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

			setValue(`${item.service}-release_trigger`);

			item.data.forEach((subItem, index) => {
				setValue(`${index}-${serviceValue}`, subItem.shipment_capacity);

				if (index === GLOBAL_CONSTANTS.zeroth_index) {
					setValue(`${item.service}-release_trigger`, subItem.release_trigger);
				}
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
