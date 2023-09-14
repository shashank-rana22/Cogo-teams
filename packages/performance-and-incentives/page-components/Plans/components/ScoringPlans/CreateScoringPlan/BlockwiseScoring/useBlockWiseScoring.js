import { useFieldArray, useForm } from '@cogoport/forms';
import { useEffect, useMemo, useState } from 'react';

const getParameters = ({ parameters = [] }) => parameters.map((parameter) => {
	const {
		agent_scoring_parameter_id, scoring_type, base_score, fixed_percentage_value,
		variable_percentage_value, provisional_trigger, realised_trigger, parameter_unit,
	} = parameter;
	return {
		base_score,
		scoring_type,
		realised_trigger,
		provisional_trigger,
		fixed_percentage_value,
		variable_percentage_value,
		scoring_unit : parameter_unit,
		parameter    : agent_scoring_parameter_id,
	};
});

const useBlockWiseScoring = ({ data = {} }) => {
	const [formData, setFormData] = useState({});
	const [editSubBlock, setEditSubBlock] = useState({});

	const { control, formState: { errors }, watch, setValue, handleSubmit } = useForm();

	const { fields, append, remove } = useFieldArray({ control, name: 'blocks' });

	const prefillValues = useMemo(() => Object.entries(data.config_blocks?.reduce((acc, item) => {
		const updatedAcc = { ...acc };

		const value = {
			sub_block_id : item.agent_scoring_block_id,
			parameters   : getParameters({ parameters: item.parameters }),
		};

		if (!updatedAcc[item.agent_scoring_block?.display_name]) {
			updatedAcc[item.agent_scoring_block?.display_name] = [value];
		} else {
			updatedAcc[item.agent_scoring_block?.display_name].push(value);
		}

		return updatedAcc;
	}, {}) || [])?.map(([key, value]) => ({ block: key, sub_blocks: value })), [data]);

	const additionalControlsData = useMemo(() => {
		if (!data || !data.config_blocks) {
			return {};
		}

		return data.config_blocks.reduce((acc, item) => {
			const currAcc = { ...acc };

			currAcc[item.agent_scoring_block_id] = item.parameters.reduce((subAcc, subItem) => {
				const currSubAcc = { ...subAcc };

				currSubAcc[subItem.agent_scoring_parameter_id] = subItem.additional_controls;

				return currSubAcc;
			}, {});

			return currAcc;
		}, {});
	}, [data]);

	useEffect(() => {
		setValue('blocks', prefillValues);
		setFormData(prefillValues);
		setEditSubBlock({});
	}, [setValue, prefillValues]);

	return {
		fields,
		append,
		remove,
		errors,
		watch,
		control,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		formData,
		setFormData,
		additionalControlsData,
	};
};

export default useBlockWiseScoring;
