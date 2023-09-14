import { useMemo } from 'react';

const useBlockParameters = (props) => {
	const {
		watch,
		blockIndex,
		subBlockIndex,
		paramIndex,
		parameterOptions,
	} = props;

	const formValues = watch();

	const filteredParameterOptions = useMemo(() => {
		const selectedParameterOptions = formValues.blocks?.[blockIndex]
			?.sub_blocks?.[subBlockIndex]?.parameters?.reduce((accumulator, currentValue, currentIndex) => {
				if (currentIndex < paramIndex) {
					const accumulatorCopy = [...accumulator];
					accumulatorCopy.push(currentValue.parameter);

					return accumulatorCopy;
				}
				return accumulator;
			}, []);

		return parameterOptions.filter((item) => !selectedParameterOptions.includes(item.value));
	}, [formValues.blocks, blockIndex, subBlockIndex, parameterOptions, paramIndex]);

	return {
		filteredParameterOptions,
	};
};

export default useBlockParameters;
