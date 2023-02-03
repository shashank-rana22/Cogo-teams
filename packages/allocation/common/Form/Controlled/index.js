import {
	ChipsController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
} from '@cogoport/forms';

// import AsyncMultiSelectController from './AsyncMultiSelectController';
import AsyncSelectController from './AsyncSelectController';

const controlTypeControllerMapping = {
	text        : InputController,
	select      : SelectController,
	multiSelect : MultiselectController,
	radioGroup  : RadioGroupController,
	asyncSelect : AsyncSelectController,
	// asyncMultiSelect : AsyncMultiSelectController,
	chips       : ChipsController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
