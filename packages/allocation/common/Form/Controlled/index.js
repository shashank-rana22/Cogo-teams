import { InputController, MultiselectController, RadioGroupController, SelectController } from '@cogoport/forms';

import AsyncSelectController from './AsyncSelectController';

const controlTypeControllerMapping = {
	text        : InputController,
	select      : SelectController,
	multiSelect : MultiselectController,
	radioGroup  : RadioGroupController,
	asyncSelect : AsyncSelectController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
