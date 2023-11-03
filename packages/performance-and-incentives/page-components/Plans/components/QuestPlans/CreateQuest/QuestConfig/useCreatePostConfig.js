import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const useCreatePostConfig = ({ config_id }) => {
	const router = useRouter();

	const { control, handleSubmit, watch } = useForm();

	const [{ loading }, trigger] = useAllocationRequest(
		{
			url     : '/quest_configuration',
			method  : 'POST',
			authkey : 'post_agent_scoring_quest_configuration',
		},
		{ manual: true },
	);

	const handleClick = async (formValues) => {
		try {
			const { date_range, quest_string } = formValues;

			const { data } = await trigger({
				data: {
					agent_scoring_quest_id : config_id,
					quest_string,
					start_date             : date_range?.startDate,
					end_date               : date_range?.endDate,
				},
			});

			Toast.success('Saved successfully!');

			router.push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${data?.id}`);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		loading,
		control,
		handleSubmit,
		handleClick,
		watch,
		// fields,
		// append,
		// remove,
	};
};

export default useCreatePostConfig;
