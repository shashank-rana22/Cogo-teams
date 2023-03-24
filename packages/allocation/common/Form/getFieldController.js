import {
	CreatableSelectController,
	AsyncSelectController,
	ChipsController,
	DatepickerController,
	DateRangePickerController,
	DayFrequencyController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
	UploadController,
	TextAreaController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text               : InputController,
	number             : InputController,
	select             : SelectController,
	multiSelect        : MultiselectController,
	radioGroup         : RadioGroupController,
	asyncSelect        : AsyncSelectController,
	chips              : ChipsController,
	selectDayFrequency : DayFrequencyController,
	datePicker         : DatepickerController,
	dateRangePicker    : DateRangePickerController,
	fileUpload         : UploadController,
	creatableSelect    : CreatableSelectController,
	textarea           : TextAreaController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
