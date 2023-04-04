import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getServiceValues from '../helpers/get-service-values';

import useGetControls from './useServiceUpsellControlsList';

const formatControls = (controls, service) => controls.map((control) => {
	if (control.options && control.name !== 'location_id') {
		return {
			...control,
			options: control.options.filter(
				(item) => !item.type || item.type === service.type,
			),
		};
	}
	return control;
});

function useServiceUpsellControls({ service, services = [], truckTypeToggle, setTruckTypeToggle }) {
	const search_type = service?.service;

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type.split('_service')[0],
	}));

	const { serviceWiseControls } = useGetControls({ truckTypeToggle });

	const rawControls = formatControls(
		serviceWiseControls[search_type] || [],
		service,
	);

	const prefilledValues = getServiceValues(service, rawControls, {
		service_details: newServices,
	});

	const controls = rawControls.map((control) => ({
		...control,
		value:
			service?.[control.name] || prefilledValues[control.name] || control.value,
	}));

	const { handleSubmit, watch, control, formState : { errors } } = useForm(controls);

	const formValues = watch();
	const { truck_body_type } = formValues;

	useEffect(() => {
		if (truck_body_type) { setTruckTypeToggle(truck_body_type); }
	}, [truck_body_type, setTruckTypeToggle]);

	const formProps = {
		formValues,
		handleSubmit,
		watch,
		control,
		errors,
	};

	return {
		formProps,
		controls,
	};
}

export default useServiceUpsellControls;
