import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import blockOptions from '../../../../../constants/select-block-options';

import useGetAgentScoringBlocks from './useGetAgentScoringBlocks';

const useBlockCreation = ({ control, name, watch, blockIndex, prefillValues, config_id }) => {
	const CHILD_EMPTY_VALUES = {
		sub_block_id : '',
		parameters   : [],
	};

	const watchBlock = watch(`${name}.block`);

	const { list, blockParameterLoading } = useGetAgentScoringBlocks({ watchBlock, config_id });

	const { fields, append, remove } = useFieldArray({ control, name: `${name}.sub_blocks` });

	const subBlockOptions = useMemo(() => list.filter((item) => item.status === 'active')
		?.map(({ id, sub_block_name }) => ({
			label : startCase(sub_block_name),
			value : id,
		})), [list]);

	const subBlockWiseParameterOptions = useMemo(() => list.reduce((acc, subBlockItem) => {
		const { id: sub_block_id, agent_scoring_parameters } = subBlockItem || {};

		return {
			...acc,
			[sub_block_id]: (agent_scoring_parameters || []).filter((item) => item.status === 'active')
				?.map((parameter) => {
					const { id, name: paramName, parameter_unit, additional_controls } = parameter || {};

					return {
						label : paramName,
						value : id,
						unit  : parameter_unit,
						additional_controls,
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

	const checkForBlock = () => prefillValues?.find((item) => item.block === watchBlock);

	return {
		CHILD_EMPTY_VALUES,
		watchBlock,
		subBlockType,
		fields,
		append,
		remove,
		checkForBlock,
		subBlockOptions,
		subBlockWiseParameterOptions,
		blockParameterLoading,
		filteredBlockOptions,
	};
};

export default useBlockCreation;
