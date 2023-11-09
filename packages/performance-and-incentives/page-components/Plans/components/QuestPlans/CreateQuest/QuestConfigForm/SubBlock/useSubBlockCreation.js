import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getPrimaryControls from './get-block-primary-controls';

const useSubBlockCreation = (props) => {
	const {
		subBlockWiseParameterOptions,
		watch,
		blockIndex,
		subBlockIndex,
		subBlockOptions,
	} = props;

	const formValues = watch();

	const watchSubBlock = formValues.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.sub_block_id;

	const parameterOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]?.map(
		({ label, value }) => ({ label, value }),
	), [subBlockWiseParameterOptions, watchSubBlock]);

	const controls = getPrimaryControls({ parameterOptions });

	const parameterUnitOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]
		?.reduce((acc, { value, unit }) => ({
			...acc,
			[value]: [{ label: startCase(unit), value: unit }],
		}), {}), [subBlockWiseParameterOptions, watchSubBlock]);

	const filteredSubBlockOptions = useMemo(() => {
		const selectedBlockOptions = formValues.blocks[blockIndex]
			?.sub_blocks?.reduce((accumulator, currentValue, currentIndex) => {
				if (currentIndex < subBlockIndex) {
					const accumulatorCopy = [...accumulator];
					accumulatorCopy.push(currentValue.sub_block_id);

					return accumulatorCopy;
				}
				return accumulator;
			}, []);

		return subBlockOptions.filter((item) => !selectedBlockOptions.includes(item.value));
	}, [formValues.blocks, blockIndex, subBlockOptions, subBlockIndex]);

	return {
		controls,
		parameterOptions,
		parameterUnitOptions,
		filteredSubBlockOptions,
	};
};

export default useSubBlockCreation;
