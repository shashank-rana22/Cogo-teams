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

	const { list, blockParameterLoading } = useGetAgentScoringBlocks({ watchBlock });

	const { fields, append, remove } = useFieldArray({ control, name: `${name}.sub_blocks` });

	const subBlockOptions = useMemo(() => list.map(({ id, sub_block_name }) => ({
		label : startCase(sub_block_name),
		value : id,
	})), [list]);

	const subBlockWiseParameterOptions = useMemo(() => list.reduce((acc, subBlockItem) => {
		const { id: sub_block_id, agent_scoring_parameters } = subBlockItem || {};

		return {
			...acc,
			[sub_block_id]: (agent_scoring_parameters || []).map((parameter) => {
				const { id, display_name, parameter_unit } = parameter || {};

				return {
					label : display_name,
					value : id,
					unit  : parameter_unit,
				};
			}),
		};
	}, {}), [list]);

	const subBlockType = list[GLOBAL_CONSTANTS.zeroth_index]?.sub_block_type;

	return {
		CHILD_EMPTY_VALUES,
		watchBlock,
		subBlockType,
		fields,
		append,
		remove,
		subBlockOptions,
		subBlockWiseParameterOptions,
		blockParameterLoading,
	};
};

export default useBlockCreation;
