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
	InputNumberController,
	CheckboxGroupController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input            : InputController,
	select           : SelectController,
	chips            : ChipsController,
	'multi-select'   : MultiselectController,
	'async-select'   : AsyncSelectController,
	datepicker       : DatepickerController,
	upload           : UploadController,
	file             : UploadController,
	textarea         : TextAreaController,
	'text-area'      : TextAreaController,
	checkbox         : CheckboxController,
	'checkbox-group' : CheckboxGroupController,
	radio            : RadioGroupController,
	text             : InputController,
	number           : InputNumberController,
};

const getElementController = (type = 'input') => CONTROLLER_MAPPING?.[type];

export default getElementController;
