import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

import getQuestFormattedData from './configurations/getQuestFormattedData';
import getStringFromQuest from './configurations/getStringFromQuest';

const REQUIRED_FEILDS = ['agent_scoring_block_id', 'agent_scoring_parameter_id', 'value'];

const FIELD_LABEL_MAPPING = {
	agent_scoring_block_id     : 'sub_block_name',
	agent_scoring_parameter_id : 'display_name',
};

const useCreatePostConfig = ({ quest_id, data = {} }) => {
	const router = useRouter();

	const questFormattedData = getQuestFormattedData({ data: data?.quest_configurations });

	const [labelData, setLabelData] = useState(questFormattedData || []);

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

	const formattedString = getStringFromQuest({ data: labelData });

	const onChangeChild = ({ val, obj, index, name }) => {
		if (!REQUIRED_FEILDS.includes(name)) return;

		const newLabelData = [...labelData];

		newLabelData[index] = { ...labelData[index], [name]: obj?.[FIELD_LABEL_MAPPING[name]] || val };

		setLabelData(newLabelData);
	};

	const onDeleteChild = ({ index }) => {
		const newLabelData = [...labelData];

		newLabelData.splice(index, 1);

		setLabelData(newLabelData);
	};

	return {
		loading,
		control,
		handleSubmit,
		handleClick,
		watch,
		errors,
		onChangeChild,
		onDeleteChild,
		generateQuest: formattedString,
	};
};

export default useCreatePostConfig;
