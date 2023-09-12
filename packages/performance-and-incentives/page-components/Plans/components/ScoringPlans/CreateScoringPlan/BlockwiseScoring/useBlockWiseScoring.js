import { useFieldArray, useForm } from '@cogoport/forms';
import { useEffect, useMemo } from 'react';

const getParameters = ({ parameters = [] }) => parameters.map((parameter) => {
	const {
		agent_scoring_parameter_id, scoring_type, base_score, fixed_percentage_value,
		variable_percentage_value, provisional_trigger, realised_trigger,
	} = parameter;
	return {
		base_score,
		scoring_type,
		realised_trigger,
		provisional_trigger,
		fixed_percentage_value,
		variable_percentage_value,
		parameter: agent_scoring_parameter_id,
	};
});

const useBlockWiseScoring = ({ data = {} }) => {
	const { control, formState: { errors }, watch, setValue } = useForm();

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

	console.log('obj :: ', prefillValues);
	console.log('values:: ', data.config_blocks?.reduce((acc, item) => {
		const updatedAcc = { ...acc };

		const value = {
			sub_block_id : item.agent_scoring_block_id,
			parameters   : getParameters({ parameters: item.parameters }),
		};

		if (!updatedAcc[item.agent_scoring_block?.name]) {
			updatedAcc[item.agent_scoring_block?.name] = [value];
		} else {
			updatedAcc[item.agent_scoring_block?.name].push(value);
		}

		return updatedAcc;
	}, {}));

	useEffect(() => {
		setValue('blocks', prefillValues);
	}, [setValue, prefillValues]);

	return {
		fields,
		append,
		remove,
		errors,
		watch,
		control,
	};
};

export default useBlockWiseScoring;
