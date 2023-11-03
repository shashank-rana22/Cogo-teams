import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';

const useCreatePostConfig = ({ quest_id, data = {} }) => {
	const router = useRouter();

	console.log('data::', router);

	const { control, formState: { errors = {} }, handleSubmit, watch } = useForm({
		defaultValues: {
			agent_scoring_quest_configurations: data?.quest_configuration,
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
		console.log('formValues::', formValues);
		try {
			const { agent_scoring_quest_configurations } = formValues;

			const { data: res } = await trigger({
				data: {
					agent_scoring_quest_id: quest_id,
					agent_scoring_quest_configurations,
				},
			});

			Toast.success('Saved successfully!');

			router.push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${res?.id}`);
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
		// fields,
		// append,
		// remove,
	};
};

export default useCreatePostConfig;
