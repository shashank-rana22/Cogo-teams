import { SelectController, InputController } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';
import { useMemo } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
import usePostAgentScoringAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

const useSubBlockCreation = (props) => {
	const {
		subBlockWiseParameterOptions,
		subBlockType,
		watch,
		name,
		blockIndex,
		subBlockIndex,
		refetch,
	} = props;

	const { updateScoringAttributes, loading } = usePostAgentScoringAttributes();

	const watchSubBlock = watch(`${name}.sub_block_id`);

	const parameterUnitOptions = useMemo(() => subBlockWiseParameterOptions?.[watchSubBlock]
		?.reduce((acc, { id, unit }) => ({
			...acc,
			[id]: [{ label: startCase(unit), value: unit }],
		}), {}), [subBlockWiseParameterOptions, watchSubBlock]);

	const parameterOptions = useMemo(() => subBlockWiseParameterOptions[watchSubBlock]?.map(
		({ label, value }) => ({ label, value }),
	), [subBlockWiseParameterOptions, watchSubBlock]);

	const controls = getPrimaryControls({ parameterOptions });

	const Element = subBlockType === 'group' ? InputController : SelectController;

	const handleClick = () => {
		const subBlockValues = watch(`blocks[${blockIndex}][${subBlockIndex}]`);

		const agentScoringBlockId = subBlockValues.sub_block_id;

		const agentScoringParameters = subBlockValues.parameters.map((item) => ({
			agent_scoring_parameter_id : item.parameter,
			scoring_type               : item.scoring_type,
			base_score                 : item.base_score || undefined,
			fixed_percentage_value     : item.fixed_percentage_value || undefined,
			variable_percentage_value  : item.variable_percentage_value || undefined,
			provisional_trigger        : '1st SID booked',
			realised_trigger           : 'IRN generation / Invoice Knockoff',

		}));

		updateScoringAttributes({ agentScoringBlockId, agentScoringParameters });

		refetch();
	};

	return {
		controls,
		Element,
		parameterUnitOptions,
		loading,
		handleClick,
	};
};

export default useSubBlockCreation;
