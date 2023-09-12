import { SelectController, InputController } from '@cogoport/forms';
import { useMemo } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
import usePostAgentScoringAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

const useSubBlockCreation = ({
	parameterOptions = {}, subBlockType = '',
	watch = () => {}, name = '', index = 0, subBlockIndex = 0,
}) => {
	const { postAgentScoringAttributes, loading } = usePostAgentScoringAttributes();

	const watchSubBlock = watch(`${name}.sub_block_id`);

	const parameterUnitOptions = useMemo(() => parameterOptions[watchSubBlock]?.reduce((acc, item) => {
		acc[item.id] = [{ label: item.unit, value: item.unit }];
		return acc;
	}, {}), [parameterOptions, watchSubBlock]);

	const paramOptions = parameterOptions[watchSubBlock]?.map(({ label, value }) => ({ label, value }));

	const controls = getPrimaryControls({ parameterOptions: paramOptions });

	const Element = subBlockType === 'group' ? InputController : SelectController;

	const handleClick = () => {
		const subBlockValues = watch(`blocks[${index}][${subBlockIndex}]`);

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

		postAgentScoringAttributes({ agentScoringBlockId, agentScoringParameters });
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
