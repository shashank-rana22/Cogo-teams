import { useForm } from '@cogoport/forms';

import getField from '../configurations/index';

const useUpdateSpotNegotiationRate = ({ service }) => {
	const { control, watch } = useForm();
	const values = watch();
	const showElements = { sourced_by_id: !values?.service_provider_id };
	const fields = getField({ service, serviceProviderId: values?.service_provider_id });

	return {
		fields,
		control,
		showElements,
	};
};
export default useUpdateSpotNegotiationRate;
