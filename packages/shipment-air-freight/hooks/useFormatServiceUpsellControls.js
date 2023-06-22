import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useState } from 'react';

import getServiceValues from '../commons/utils/get-service-values';

import useGetControls from './useServiceUpsellControlsList';

function useServiceUpsellControls({
	service = '',
	services = [],
	upsellableService = {},
}) {
	const [truckTypeToggle, setTruckTypeToggle] = useState(false);

	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type?.split('_service')?.[GLOBAL_CONSTANTS.zeroth_index],
	}));
	const { serviceWiseControls = {} } = useGetControls({ truckTypeToggle });

	const rawControls = serviceWiseControls[service];

	const prefilledValues = getServiceValues(upsellableService, rawControls, {
		service_details: newServices,
	});

	const DEFAULT_VALUES = {};
	rawControls.forEach((control) => {
		DEFAULT_VALUES[control?.name] = service?.[control?.name] || prefilledValues?.[control?.name] || control?.value;
	});

	const {
		handleSubmit, watch,
		control, formState : { errors }, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const truck_body_type = watch('truck_body_type');

	useEffect(() => {
		setTruckTypeToggle(truck_body_type);
		setValue('truck_type', '');
	}, [truck_body_type, setTruckTypeToggle, setValue]);

	const formProps = {
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
