import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const useCreatePostConfig = ({ quest_id, data = {} }) => {
	const router = useRouter();

	const { control, formState: { errors = {} }, handleSubmit, watch } = useForm({
		defaultValues: {
			agent_scoring_quest_configurations: data?.quest_configurations,
		},
	});

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
			await trigger({
				data: {
					agent_scoring_quest_id: quest_id,
					...formValues,
				},
			});

			Toast.success('Saved successfully!');

			router.push('/performance-and-incentives/plans?tab=quest_plans');
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
		errors,
	};
};

export default useCreatePostConfig;
