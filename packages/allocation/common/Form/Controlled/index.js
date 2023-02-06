import {
	ChipsController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
} from '@cogoport/forms';

// import AsyncMultiSelectController from './AsyncMultiSelectController';
import AsyncSelectController from './AsyncSelectController';
import DayFrequencyController from './DayFrequencyController';

const controlTypeControllerMapping = {
	text               : InputController,
	number             : InputController,
	select             : SelectController,
	multiSelect        : MultiselectController,
	radioGroup         : RadioGroupController,
	asyncSelect        : AsyncSelectController,
	// asyncMultiSelect : AsyncMultiSelectController,
	chips              : ChipsController,
	selectDayFrequency : DayFrequencyController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
