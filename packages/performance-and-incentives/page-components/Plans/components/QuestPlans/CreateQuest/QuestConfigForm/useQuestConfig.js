import { Toast } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useEffect, useMemo, useState } from 'react';

import getQuestFormattedData from './configurations/getQuestFormattedData';
import getStringFromQuest from './configurations/getStringFromQuest';

const REQUIRED_FEILDS = ['agent_scoring_block_id', 'agent_scoring_parameter_id', 'value', 'parameter'];

const FIELD_LABEL_MAPPING = {
	agent_scoring_block_id : 'sub_block_name',
	parameter              : 'agent_scoring_parameter_id',
};

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

const useQuestConfig = ({ data = {}, refetch = () => {}, questName = null }) => {
	const [editSubBlock, setEditSubBlock] = useState({});

	const [blockId, setBlockId] = useState({});

	const questFormattedData = useMemo(
		() => getQuestFormattedData({ setBlockId, data: data?.quest_configurations }),
		[data],
	);

	const [labelData, setLabelData] = useState(questFormattedData || {});

	const { control, formState: { errors }, watch, handleSubmit, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({ control, name: 'blocks' });

	const defaultValues = useMemo(() => (data?.quest_configurations || [])?.reduce((acc, item) => {
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
	}, {}), [data?.quest_configurations]);

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

		const { quest_string } = formValues;

		try {
			await trigger({
				data: {
					agent_scoring_quest_id             : data?.id,
					agent_scoring_quest_configurations : payload,
					name                               : questName,
					quest_string,
				},
			});

			Toast.success('Saved successfully!');
			refetch();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const formattedString = getStringFromQuest({ data: labelData, blockId });

	const onChangeChild = ({ val, obj, index, name, subBlockName }) => {
		if (!REQUIRED_FEILDS.includes(name)) return;

		const subBlockLabel = labelData[subBlockName] || [];

		const newLabelData = [...subBlockLabel];

		newLabelData[index] = {
			...newLabelData[index],
			[FIELD_LABEL_MAPPING[name] || name]: obj?.label || val,
		};

		setLabelData((l) => ({ ...l, [subBlockName]: newLabelData }));
	};

	const onDeleteChild = ({ index, subBlockName }) => {
		const subBlockLabel = labelData[subBlockName] || [];

		const newLabelData = [...subBlockLabel];

		newLabelData.splice(index, 1);

		setLabelData((label) => ({ ...label, [subBlockName]: newLabelData }));
	};

	const onClickFill = () => {
		setValue('quest_string', formattedString);
	};

	const handleResetString = () => {
		setValue('quest_string', data?.quest_string);
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
		onChangeChild,
		onDeleteChild,
		formattedString,
		setBlockId,
		prefillValues: formattedDefaultValues,
		onClickFill,
		handleResetString,
	};
};

export default useQuestConfig;
