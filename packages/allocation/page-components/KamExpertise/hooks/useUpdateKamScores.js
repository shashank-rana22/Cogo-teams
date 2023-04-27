import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

function useUpdateKamScores(props) {
	const {
		transition_level,
		refetch,
		cardRefetch,
	} = props;

	const formProps = useForm();

	const [{ loading : updateLoading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : 'kam_expertise_configuration_attributes',
		authkey : 'post_allocation_kam_expertise_configuration_attributes',
	}, { manual: true });

	const onSave = async (formValues) => {
		const configuration_details = [];

		Object.keys(formValues).forEach((key) => {
			if (formValues[key]) {
				configuration_details.push(
					{ configuration_id: key, threshold_score: Number(formValues[key]) },
				);
			}
		});

		try {
			const payload = {
				transition_level,
				configuration_details,
			};

			await trigger({
				data: payload,
			});

			refetch();

			cardRefetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		updateLoading,
		onSave,
		formProps,
	};
}
export default useUpdateKamScores;
