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

	const { control, formState: { errors }, handleSubmit, setValue, getValues, watch } = useForm();

	console.log(watch(), 'h7');

	const handleReset = useCallback(() => {
		console.log(getValues(), 'h10');

		const registeredFieldNames = Object.keys(getValues());

		registeredFieldNames.forEach((fieldName) => {
			if (fieldName.includes('release_trigger')) {
				setValue(fieldName, ['trigger']);
			} else {
				setValue(fieldName, '');
			}
		});
	}, [getValues, setValue]);

	useEffect(() => {
		if (isEmpty(data.shipment_capacities)) {
			handleReset();
			return;
		}

		const serviceWiseData = services?.map((service) => {
			const filteredData = data.shipment_capacities?.filter((item) => (
				[
					item.service_type,
					item.service_transit_type,
					item.service_trade_type,
				].filter(Boolean).join('-') === service.value)) || [];

			return {
				service : service.value,
				data    : filteredData.sort((a, b) => a.slab_lower_limit - b.slab_lower_limit),
			};
		});

		serviceWiseData.forEach((item) => {
			const serviceValue = item.service;

			item.data?.forEach((subItem, index) => {
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
		watch,
		handleSubmit,
		handleReset,
		createShipmentLoading,
		createShipmentCapacities,
	};
};

export default useShipmentCapacities;
