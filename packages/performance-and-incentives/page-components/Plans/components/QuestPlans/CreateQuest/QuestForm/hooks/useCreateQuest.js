import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useCreateQuest = ({ setParams = () => {}, refetch = () => {} }) => {
	const { control, handleSubmit, watch, reset, formState: { errors = {} } } = useForm();

	const [{ loading }, trigger] = useAllocationRequest(
		{
			url    : '/quest',
			method : 'POST',
		},
		{ manual: true },
	);

	const handleClick = async (formValues) => {
		try {
			const { name, date_range } = formValues;

			await trigger({
				data: {
					name,
					start_date : date_range?.start_date,
					end_date   : date_range?.end_date,
				},
			});

			Toast.success('Saved successfully!');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const [date_range, agent_scoring_config_id] = watch(['date_range', 'agent_scoring_config_id']);

	// const agent_scoring_config_id = watch('agent_scoring_config_id') || undefined;

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
