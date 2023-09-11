import { useFieldArray } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useEffect, useMemo } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';

import useGetAgentScoringBlocks from './useGetAgentScoringBlocks';

const useBlockCreation = ({ control, name, watch }) => {
	const CHILD_EMPTY_VALUES = {};

	getPrimaryControls({}).forEach((controlItem) => {
		if (controlItem.type === 'fieldArray') {
			const NESTED_CHILD_EMPTY_VALUES = {};

			controlItem.controls.forEach((childControlItem) => {
				NESTED_CHILD_EMPTY_VALUES[childControlItem.name] = '';
			});

			CHILD_EMPTY_VALUES[controlItem.name] = NESTED_CHILD_EMPTY_VALUES;
		} else {
			CHILD_EMPTY_VALUES[controlItem.name] = '';
		}
	});

	const blockValue = watch(`${name}.block`);

	const { data = {} } = useGetAgentScoringBlocks({ blockValue });

	const { list = [] } = data;

	const subBlockType = list[GLOBAL_CONSTANTS.zeroth_index]?.sub_block_type;

	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const subBlockOptions = useMemo(() => list.map(({ sub_block_name }) => ({
		label : startCase(sub_block_name),
		value : sub_block_name,
	})), [list]);

	const parameterOptions = useMemo(() => list.reduce((acc, item) => {
		acc[item.sub_block_name] = item.agent_scoring_parameters.map((parameter) => ({
			label : parameter.display_name,
			value : parameter.name,
		}));
		return acc;
	}, {}), [list]);

	useEffect(() => {

	}, [append]);

	return {
		CHILD_EMPTY_VALUES,
		blockValue,
		subBlockType,
		fields,
		append,
		remove,
		list,
		subBlockOptions,
		parameterOptions,
	};
};

export default useBlockCreation;
