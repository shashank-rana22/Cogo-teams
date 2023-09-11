import { SelectController, InputController } from '@cogoport/forms';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
// import usePostAgentScoringAttributes from '../../../../../hooks/usePostAgentScoringConfigAttributes';

const useSubBlockCreation = ({ parameterOptions = {}, subBlockType = '', watch = () => {}, name = '' }) => {
	const watchSubBlock = watch(`${name}.service`);

	const controls = getPrimaryControls({ parameterOptions: parameterOptions[watchSubBlock] });

	const Element = subBlockType === 'group' ? InputController : SelectController;

	return {
		controls,
		Element,
	};
};

export default useSubBlockCreation;
