import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import getMutatedControls from '../utils/get-mutated-address-controls';
import getPayload from '../utils/get-payload';
import getResponseControls from '../utils/get-response-controls';

const useCreateResponse = ({
	setShowForm = () => {},
	refetchResponses = () => {},
	activeTab = '',
}) => {
	const router = useRouter();

	const [responseData, setResponseData] = useState({});

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
		setValue,
		resetField,
		reset,
	} = useForm();

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const controls = getResponseControls({ activeTab, responseData });

	const { country_id } = responseData || {};

	const mutatedControls = getMutatedControls({ controls, setResponseData, activeTab });

	const onClose = () => {
		reset();
		setShowForm(false);

		['mobile_number', 'alternate_mobile_number', 'whatsapp_number'].map((field) => setValue(field, {
			country_code : undefined,
			number       : '',
		}));
	};

	const onSubmit = async () => {
		const values = getValues();

		const payload = getPayload({ values, activeTab });

		try {
			await trigger({
				data: {
					...payload,
					source              : 'manual',
					feedback_request_id : query.id,

				},
			});

			Toast.success(`${startCase(activeTab)} Added Successfully`);

			onClose();

			refetchResponses();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data)
			|| `Failed to add new ${startCase(activeTab)}, please try again...`);
		}
	};

	const resetMultipleFields = useCallback((fields = []) => {
		fields?.map((field) => resetField(field));
	}, [resetField]);

	useEffect(() => {
		resetMultipleFields(['state', 'pincode', 'city']);
	}, [country_id, resetMultipleFields]);

	return {
		loading,
		controls: mutatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
		onClose,
	};
};

export default useCreateResponse;
