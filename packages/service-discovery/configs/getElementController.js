import {
	InputController,
	CheckboxController,
	TextAreaController,
	SelectController,
	ChipsController,
	AsyncSelectController,
	DatepickerController,
	UploadController,
	RadioGroupController,
	MultiselectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input          : InputController,
	select         : SelectController,
	chips          : ChipsController,
	'multi-select' : MultiselectController,
	number         : InputController,
	'async-select' : AsyncSelectController,
	datepicker     : DatepickerController,
	upload         : UploadController,
	textarea       : TextAreaController,
	checkbox       : CheckboxController,
	radio          : RadioGroupController,
};

const getElementController = (type = 'input') => CONTROLLER_MAPPING?.[type];

export default getElementController;
