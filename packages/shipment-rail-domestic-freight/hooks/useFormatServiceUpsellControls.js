import { useForm } from '@cogoport/forms';
import { useEffect, useState } from 'react';

import getServiceValues from '../helpers/get-service-values';

import useGetControls from './useServiceUpsellControlsList';

function useServiceUpsellControls({
	service = '',
	services = [],
	upsellableService = {},
	importer_exporter_id = '',
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type?.split('_service')?.[0],
	}));
	const { serviceWiseControls = {} } = useGetControls({ truckTypeToggle });

	const rawControls = serviceWiseControls[service];
	const prefilledValues = getServiceValues(upsellableService, rawControls, {
		service_details: newServices,
	});

	const defaultValues = { organization_id: importer_exporter_id };

	rawControls?.forEach((control) => {
		defaultValues[control?.name] = service?.[control?.name] || prefilledValues?.[control?.name] || control?.value;
	});

	const { handleSubmit, watch, control, formState : { errors }, setValue, trigger } = useForm({ defaultValues });

	const formValues = watch();
	const { truck_body_type } = formValues;

	useEffect(() => {
		setTruckTypeToggle(truck_body_type);
		setValue('truck_type', '');
	}, [truck_body_type, setTruckTypeToggle, setValue]);

	const formProps = {
		formValues,
		handleSubmit,
		control,
		errors,
		trigger,
	};

	return {
		formProps,
		controls: rawControls,
	};
}

export default useServiceUpsellControls;
