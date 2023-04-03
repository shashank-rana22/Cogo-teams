import { useForm } from '@cogoport/forms';

import Controls from '../configurations/upsell/service-wise-controls';

import getServiceValues from './get-service-values';

const formatControls = (controls, service) => controls.map((control) => {
	if (control.options) {
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
	const search_type = service?.service;

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type.split('_service')[0],
	}));

	const { serviceWiseControls } = Controls();

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
