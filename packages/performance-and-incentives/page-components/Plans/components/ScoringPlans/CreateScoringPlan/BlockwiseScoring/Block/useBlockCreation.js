import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import useGetAgentScoringBlocks from './useGetAgentScoringBlocks';

const useBlockCreation = ({ control, name, watch }) => {
	const CHILD_EMPTY_VALUES = {
		sub_block_id: '',
	};

	const watchBlock = watch(`${name}.block`);

	const { data = {} } = useGetAgentScoringBlocks({ watchBlock });

	const { list = [] } = data;

	const subBlockType = list[GLOBAL_CONSTANTS.zeroth_index]?.sub_block_type;

	const { fields, append, remove } = useFieldArray({ control, name });

	const subBlockOptions = useMemo(() => list.map(({ id, sub_block_name }) => ({
		label : startCase(sub_block_name),
		value : id,
	})), [list]);

	const parameterOptions = useMemo(() => list.reduce((acc, item) => {
		acc[item.id] = item.agent_scoring_parameters.map((parameter) => ({
			label : parameter.display_name,
			value : parameter.id,
			id    : parameter.id,
			unit  : parameter.parameter_unit,
		}));
		return acc;
	}, {}), [list]);

	return {
		CHILD_EMPTY_VALUES,
		watchBlock,
		subBlockType,
		fields,
		append,
		remove,
		subBlockOptions,
		parameterOptions,
	};
};

export default useBlockCreation;
