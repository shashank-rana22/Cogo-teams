import { Toast } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useMemo, useState } from 'react';

const getFormattedPayload = (formValues) => {
	const formattedData = (formValues?.blocks || []).reduce((acc, item) => {
		const { sub_blocks } = item;
		(sub_blocks || []).forEach((sub_item) => {
			const { sub_block_id, parameters } = sub_item;
			const parameters_values = (parameters || []).map((parameter_item) => {
				const { parameter, value } = parameter_item;
				return {
					agent_scoring_block_id     : sub_block_id,
					agent_scoring_parameter_id : parameter,
					value,
				};
			});

			acc.push(...parameters_values);

			return acc;
		});

		return acc;
	}, []);

	return formattedData;
};

const useQuestConfig = ({ default_data = [], quest_id = null }) => {
	const [editSubBlock, setEditSubBlock] = useState({});

	const { control, formState: { errors }, watch, handleSubmit, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({ control, name: 'blocks' });

	const defaultValues = useMemo(() => (default_data || [])?.reduce((acc, item) => {
		const updatedAcc = { ...acc };

		if (!updatedAcc[item.agent_scoring_block_display_name]) {
			updatedAcc[item.agent_scoring_block_display_name] = {
				block      : item.agent_scoring_block_display_name,
				sub_blocks : {},
			};
		}

		const parameters = {
			parameter : item?.agent_scoring_parameter_id,
			value     : item?.value,
		};

		if (!updatedAcc[item.agent_scoring_block_display_name]?.sub_blocks?.[item.agent_scoring_block_id]) {
			updatedAcc[item.agent_scoring_block_display_name].sub_blocks[item.agent_scoring_block_id] = [parameters];
		} else {
			updatedAcc[item.agent_scoring_block_display_name].sub_blocks[item.agent_scoring_block_id].push(parameters);
		}

		return updatedAcc;
	}, {}), [default_data]);

	const formattedDefaultValues = useMemo(() => (Object.keys(defaultValues) || []).map((key) => {
		const { sub_blocks } = defaultValues[key];

		const values = Object.keys(sub_blocks).map((sub_key) => ({
			sub_block_id : sub_key,
			parameters   : sub_blocks[sub_key],
		}));

		const response = {
			block      : key,
			sub_blocks : values,
		};

		return response;
	}), [defaultValues]);

	console.log('defaultValues::', formattedDefaultValues);

	const [{ loading }, trigger] = useAllocationRequest(
		{
			url     : '/quest_configuration',
			method  : 'POST',
			authkey : 'post_agent_scoring_quest_configuration',
		},
		{ manual: true },
	);

	const handleClick = async (formValues) => {
		const payload = getFormattedPayload(formValues);

		try {
			await trigger({
				data: {
					agent_scoring_quest_id             : quest_id,
					agent_scoring_quest_configurations : payload,
				},
			});

			Toast.success('Saved successfully!');

			// router.push('/performance-and-incentives/plans?tab=quest_plans');
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		setValue('blocks', formattedDefaultValues);
		setEditSubBlock({});
	}, [setValue, formattedDefaultValues]);

	return {
		loading,
		fields,
		append,
		remove,
		errors,
		watch,
		control,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		handleClick,
		prefillValues: formattedDefaultValues,
		// additionalControlsData,
		// showActivationModal,
		// setShowActivationModal,
	};
};

export default useQuestConfig;
