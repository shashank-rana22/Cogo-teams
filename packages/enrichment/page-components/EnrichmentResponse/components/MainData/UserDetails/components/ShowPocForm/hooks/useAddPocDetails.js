import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

import getControls from '../utils/controls';
import getPocDetailsPayload from '../utils/get-poc-details-payload';

const useAddPocDetails = ({
	setShowForm = () => {},
	refetchResponses = () => {},
}) => {
	const router = useRouter();

	const {
		control,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const controls = getControls();

	const { query = {} } = router;

	const [{ loading }, trigger] = useAllocationRequest({

		url     : '/feedback_response',
		method  : 'POST',
		authkey : 'post_allocation_feedback_response',

	}, { manual: true });

	const onSubmit = async () => {
		const values = getValues();

		const payload = getPocDetailsPayload({ values, query });

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

export default useAddPocDetails;
