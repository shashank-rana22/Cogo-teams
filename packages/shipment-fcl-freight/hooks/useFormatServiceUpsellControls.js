import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getServiceValues from '../helpers/get-service-values';

import useGetControls from './useServiceUpsellControlsList';

const formatControls = (controls, service) => controls?.map((control) => {
	if (control?.options && control?.name !== 'location_id') {
		return {
			...(control || {}),
			options: control?.options?.filter(
				(item) => !item?.type || item?.type === service?.trade_type,
			),
		};
	}
	return control;
});

function useServiceUpsellControls({
	service = '',
	services = [],
	truckTypeToggle,
	setTruckTypeToggle = () => {},
	upsellableService = {},
	organization_id = '',
}) {
	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type?.split('_service')?.[0],
	}));
	const { serviceWiseControls = {} } = useGetControls({ truckTypeToggle });

	const rawControls = formatControls(
		serviceWiseControls[service] || [],
		upsellableService,
	);

	const prefilledValues = getServiceValues(upsellableService, rawControls, {
		service_details: newServices,
	});

	const defaultValues = {
		organization_id,
	};

	rawControls.forEach((control) => {
		defaultValues[control?.name] = service?.[control?.name] || prefilledValues?.[control?.name] || control?.value;
	});

	const { handleSubmit, watch, control, formState : { errors } } = useForm();

	const formValues = watch();
	const { truck_body_type } = formValues;

	useEffect(() => {
		setTruckTypeToggle(truck_body_type);
	}, [truck_body_type, setTruckTypeToggle]);

	const formProps = {
		formValues,
		handleSubmit,
		control,
		errors,
	};

	return {
		formProps,
		controls: rawControls,
	};
}

export default useServiceUpsellControls;
