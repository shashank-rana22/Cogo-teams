import {
	ChipsController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
} from '@cogoport/forms';

import AsyncSelectController from './AsyncSelectController';
import DayFrequencyController from './DayFrequencyController';

const controlTypeControllerMapping = {
	text               : InputController,
	number             : InputController,
	select             : SelectController,
	multiSelect        : MultiselectController,
	radioGroup         : RadioGroupController,
	asyncSelect        : AsyncSelectController,
	chips              : ChipsController,
	selectDayFrequency : DayFrequencyController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
