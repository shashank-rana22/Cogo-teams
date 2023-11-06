import { startCase, isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import PARAM_TRIGGERS_MAPPING from '../../../../../../constants/parameter-triggers-mapping';

// import PARAM_TRIGGERS_MAPPING from '../../../../../constants/parameter-triggers-mapping';

const useBlockParameters = (props) => {
	const {
		watch,
		blockIndex,
		paramType,
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

	const parameterTriggers = useMemo(() => {
		const parameter = filteredParameterOptions.find((item) => item.value === paramType) || {};
		const paramTriggers = PARAM_TRIGGERS_MAPPING[parameter.label] || {};
		return paramTriggers;
	}, [filteredParameterOptions, paramType]);

	const memoizedTriggerMapping = useMemo(() => (!isEmpty(parameterTriggers) ? {
		provisional_trigger: {
			options: [{
				label : startCase(parameterTriggers.provisional_trigger),
				value : parameterTriggers.provisional_trigger,
			}],
		},
		realised_trigger: {
			options: [{
				label : startCase(parameterTriggers.realised_trigger),
				value : parameterTriggers.realised_trigger,
			}],
		},
	} : {
		provisional_trigger: {
			options: [{
				label : 'Default',
				value : 'default',
			}],
		},
		realised_trigger: {
			options: [{
				label : 'Default',
				value : 'default',
			}],
		},
	}), [parameterTriggers]);

	const paramOptions = useMemo(() => filteredParameterOptions.map(({ label, value }) => ({
		label: startCase(label),
		value,
	})), [filteredParameterOptions]);

	return {
		paramOptions,
		memoizedTriggerMapping,
	};
};

export default useBlockParameters;
