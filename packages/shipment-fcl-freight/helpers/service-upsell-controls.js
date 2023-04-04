import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import Controls from '../configurations/upsell/service-wise-controls';

import getServiceValues from './get-service-values';

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

function ServiceUpsellControls({ service, services = [] }) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const search_type = service?.service;

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type.split('_service')[0],
	}));

	const { serviceWiseControls } = Controls({ truckTypeToggle });

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
	const truck_body_type = watch('truck_body_type');

	useEffect(() => {
		setTruckTypeToggle(truck_body_type);
	}, [truck_body_type]);

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

export default ServiceUpsellControls;
