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
	PriceSelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input            : InputController,
	select           : SelectController,
	chips            : ChipsController,
	'multi-select'   : MultiselectController,
	'async-select'   : AsyncSelectController,
	datepicker       : DatepickerController,
	upload           : UploadController,
	textarea         : TextAreaController,
	checkbox         : CheckboxController,
	'checkbox-group' : CheckboxGroupController,
	radio            : RadioGroupController,
	text             : InputController,
	number           : InputNumberController,
	pills            : ChipsController,
	'price-select'   : PriceSelectController,
};

const getElementController = (type = 'input') => CONTROLLER_MAPPING?.[type] || InputController;

export default getElementController;
