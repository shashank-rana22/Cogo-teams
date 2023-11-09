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
	InputGroupController,
	RangeSliderController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input            : InputController,
	select           : SelectController,
	chips            : ChipsController,
	'multi-select'   : MultiselectController,
	'async-select'   : AsyncSelectController,
	datepicker       : DatepickerController,
	'date-picker '   : DatepickerController,
	upload           : UploadController,
	file             : UploadController,
	textarea         : TextAreaController,
	checkbox         : CheckboxController,
	'checkbox-group' : CheckboxGroupController,
	radio            : RadioGroupController,
	text             : InputController,
	number           : InputNumberController,
	pills            : ChipsController,
	'price-select'   : PriceSelectController,
	'input-group'    : InputGroupController,
	'range-slider'   : RangeSliderController,
};

const getElementController = (type = 'input') => CONTROLLER_MAPPING?.[type] || InputController;

export default getElementController;
