import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import blockOptions from '../../../../../constants/select-block-options';

import useGetAgentScoringBlocks from './useGetAgentScoringBlocks';

const useBlockCreation = ({ control, name, watch, blockIndex }) => {
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

	const formValues = watch();

	const filteredBlockOptions = useMemo(() => {
		const selectedBlockOptions = formValues.blocks?.reduce((accumulator, currentValue, currentIndex) => {
			if (currentIndex < blockIndex) {
				const accumulatorCopy = [...accumulator];
				accumulatorCopy.push(currentValue.block);

				return accumulatorCopy;
			}
			return accumulator;
		}, []);

		return blockOptions.filter((item) => !selectedBlockOptions.includes(item.value));
	}, [formValues.blocks, blockIndex]);

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
		filteredBlockOptions,
	};
};

export default useBlockCreation;
