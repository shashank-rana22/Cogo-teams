import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getMutatedControls from '../utils/get-mutated-controls';
import getPayload from '../utils/get-payload';
import getResponseControls from '../utils/get-response-controls';

const useCreateResponse = ({
	setDetailsForm = () => {},
	refetchResponses = () => {},
	activeTab = '',
	detailsForm = {},
}) => {
	const router = useRouter();

	const [responseData, setResponseData] = useState({});

	const {
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm();

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const controls = getResponseControls({ activeTab, responseData, detailsForm });

	const mutatedControls = getMutatedControls({
		controls,
		setResponseData,
		activeTab,
		detailsForm,
		setValue,
	});

	useEffect(() => {
		setValue('work_scopes', detailsForm?.initialData?.work_scopes);
	}, [detailsForm?.initialData?.work_scopes, setValue]);

	const onSubmit = async (values = {}) => {
		const payload = getPayload({ values, activeTab, responseData });

		const isPayloadEmpty = Object.keys(payload).every(
			(key) => key === 'response_type' || payload[key] === undefined,
		);

		if (!isPayloadEmpty) {
			try {
				await trigger({
					data: {
						...payload,
						...(detailsForm?.type === 'edit' && {
							feedback_response_id: detailsForm?.initialData?.id,
						}),
						source              : 'manual',
						feedback_request_id : query.id,

					},
				});

				Toast.success(`${startCase(activeTab)} Added Successfully`);

				setDetailsForm({});

				refetchResponses();
			} catch (err) {
				Toast.error(getApiErrorString(err?.response?.data)
				|| `Failed to add new ${startCase(activeTab)}, please try again...`);
			}
		} else {
			Toast.error('At least one field should be present');
		}
	};

	return {
		loading,
		controls: mutatedControls,
		errors,
		control,
		handleSubmit,
		onSubmit,
	};
};

export default useCreateResponse;
