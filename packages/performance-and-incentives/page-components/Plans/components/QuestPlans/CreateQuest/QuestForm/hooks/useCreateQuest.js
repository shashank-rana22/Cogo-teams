import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useCreateQuest = ({ setParams = () => {}, refetch = () => {} }) => {
	const router = useRouter();

	const { control, handleSubmit, watch, reset, formState: { errors = {} } } = useForm();

	const [{ loading }, trigger] = useAllocationRequest(
		{
			url     : '/quest',
			method  : 'POST',
			authkey : 'post_agent_scoring_quest',
		},
	);

	const handleClick = async (formValues) => {
		try {
			const { name, date_range, agent_scoring_config_id, quest_string } = formValues;

			const { data } = await trigger({
				data: {
					name,
					agent_scoring_config_id,
					quest_string,
					start_date : date_range?.startDate,
					end_date   : date_range?.endDate,
				},
			});

			Toast.success('Saved successfully!');

			router.push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${data?.id}`);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const [date_range, agent_scoring_config_id] = watch(['date_range', 'agent_scoring_config_id']);

	useEffect(() => {
		const overlapping_date_range = {
			from_date : date_range?.startDate || undefined,
			to_date   : date_range?.endDate || undefined,
		};

		if (date_range || agent_scoring_config_id) {
			setParams((p) => (
				{
					...p,
					filters: {
						...p?.filters,
						agent_scoring_config_id: agent_scoring_config_id || undefined,
						overlapping_date_range,
					},
				}
			));
			refetch();
		}
	}, [date_range, agent_scoring_config_id, setParams, refetch]);

	return {
		loading,
		control,
		errors,
		reset,
		handleClick,
		handleSubmit,
	};
};
export default useCreateQuest;
