import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

import getResponseControls from '../utils/get-response-controls';
import getResponseDetailsPayload from '../utils/get-response-details-payload';

const useCreateResponse = ({
	setShowForm = () => {},
	refetchResponses = () => {},
	activeTab = '',
}) => {
	const router = useRouter();

	const [addressData, setAddressData] = useState({});

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const { country_id, region_id } = addressData;

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const controls = getResponseControls({ activeTab, country_id, region_id });

	const mutatedControls = getMutatedControls({ controls, setAddressData });

	const onSubmit = async () => {
		const values = getValues();

		const payload = getResponseDetailsPayload({ values, query, activeTab });

		try {
			await trigger({
				data: payload,
			});

			Toast.success('POC Added Successfully');

			setShowForm(false);

			refetchResponses();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Failed to add new poc, please try again...');
		}
	};

	return {
		loading,
		controls,
		errors,
		control,
		handleSubmit,
		onSubmit,

	};
};

export default useCreateResponse;
