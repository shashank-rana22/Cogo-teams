import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { getFormattedDate, getPrefillFormattedDate } from '../../../../../../../utils/get-formatted-date';

const getFormattedData = ({ data }) => {
	if (isEmpty(data)) return {};
	return {
		...data,
		date_range: {
			startDate : new Date(data?.start_date) || null,
			endDate   : new Date(getPrefillFormattedDate({ currentDate: data?.end_date })) || null,
		},
	};
};

const useCreateQuest = ({
	setParams = () => {},
	data = {},
	setShowOverlapped = () => {},
	setQuestData = () => {},
}) => {
	const router = useRouter();

	const { control, handleSubmit, watch, reset, formState: { errors = {} } } = useForm({
		defaultValues: {
			...getFormattedData({ data }),
		},
	});

	const [{ loading }, trigger] = useAllocationRequest(
		{
			url     : '/quest',
			method  : 'POST',
			authkey : 'post_agent_scoring_quest',
		},
		{ manual: true },
	);

	const handleClick = async (formValues) => {
		try {
			const { name, date_range, agent_scoring_config_id } = formValues;

			const { data: res } = await trigger({
				data: {
					name,
					agent_scoring_config_id,
					start_date : date_range?.startDate,
					end_date   : getFormattedDate({ currentDate: date_range?.endDate }),
				},
			});

			Toast.success('Saved successfully!');

			router.push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${res?.id}`);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const [name, date_range, agent_scoring_config_id] = watch(['name', 'date_range', 'agent_scoring_config_id']);

	useEffect(() => {
		const overlapping_date_range = {
			from_date : date_range?.startDate || undefined,
			to_date   : date_range?.endDate ? getFormattedDate({ currentDate: date_range?.endDate }) : undefined,
		};

		if (date_range || agent_scoring_config_id) {
			setShowOverlapped(true);
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
		} else {
			setShowOverlapped(false);
		}
	}, [date_range, agent_scoring_config_id, setParams, setShowOverlapped]);

	useEffect(() => {
		setQuestData((p) => ({ ...p, name, date_range }));
	}, [name, setQuestData, date_range]);

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
