import { SelectController, InputController } from '@cogoport/forms';
import { useMemo } from 'react';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';

const useSubBlockCreation = ({ parameterOptions = {}, subBlockType = '', watch = () => {}, name = '' }) => {
	const watchSubBlock = watch(`${name}.service`);

	const parameterUnitOptions = useMemo(() => parameterOptions[watchSubBlock]?.reduce((acc, item) => {
		acc[item.id] = [{ label: item.unit, value: item.unit }];
		return acc;
	}, {}), [parameterOptions, watchSubBlock]);

	const paramOptions = parameterOptions[watchSubBlock]?.map(({ label, value }) => ({ label, value }));

	const controls = getPrimaryControls({ parameterOptions: paramOptions });

	const Element = subBlockType === 'group' ? InputController : SelectController;

	return {
		controls,
		Element,
		parameterUnitOptions,
	};
};

export default useSubBlockCreation;
