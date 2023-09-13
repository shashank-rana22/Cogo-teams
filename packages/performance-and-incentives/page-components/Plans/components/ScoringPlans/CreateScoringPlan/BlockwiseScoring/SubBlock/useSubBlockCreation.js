import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
import usePostAgentScoringAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

const useSubBlockCreation = (props) => {
	const {
		subBlockWiseParameterOptions,
		watch,
		name,
		blockIndex,
		subBlockIndex,
		refetch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		subBlockOptions,
	} = props;

	const { updateScoringAttributes, loading } = usePostAgentScoringAttributes();

	const watchSubBlock = watch(`${name}.sub_block_id`);

	const parameterUnitOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]
		?.reduce((acc, { value, unit }) => ({
			...acc,
			[value]: [{ label: startCase(unit), value: unit }],
		}), {}), [subBlockWiseParameterOptions, watchSubBlock]);

	const parameterOptions = useMemo(() => subBlockWiseParameterOptions[watchSubBlock]?.map(
		({ label, value }) => ({ label, value }),
	), [subBlockWiseParameterOptions, watchSubBlock]);

	const controls = getPrimaryControls({ parameterOptions });

	const handleClick = async ({ subBlockStatus = '' } = {}) => {
		if (!editSubBlock[blockIndex]?.[subBlockIndex]) {
			setEditSubBlock((prev) => ({
				...prev,
				[blockIndex]: {
					...prev[blockIndex],
					[subBlockIndex]: true,
				},
			}));
			return;
		}

		handleSubmit(async () => {
			const subBlockValues = watch(`blocks[${blockIndex}].sub_blocks[${subBlockIndex}]`) || {};

			const agentScoringBlockId = subBlockValues.sub_block_id;

			const agentScoringParameters = subBlockValues.parameters?.map((item) => ({
				agent_scoring_parameter_id : item.parameter,
				scoring_type               : item.scoring_type,
				base_score                 : item.base_score || undefined,
				fixed_percentage_value     : item.fixed_percentage_value || undefined,
				variable_percentage_value  : item.variable_percentage_value || undefined,
				provisional_trigger        : item.provisional_trigger,
				realised_trigger           : item.realised_trigger,

			}));

			await updateScoringAttributes({ agentScoringBlockId, agentScoringParameters, subBlockStatus });

			refetch();
		})();
	};

	const formValues = watch();

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

	const checkForSubBlock = () => prefillValues[blockIndex]
		?.sub_blocks?.find((item) => item.sub_block_id === watchSubBlock);

	return {
		controls,
		Element,
		parameterUnitOptions,
		loading,
		handleClick,
		checkForSubBlock,
		filteredSubBlockOptions,
	};
};

export default useSubBlockCreation;
