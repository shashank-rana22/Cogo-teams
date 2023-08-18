import {
	CreatableSelectController,
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
	CheckboxController,
	InputNumberController,
} from '@cogoport/forms';

import AsyncSelectController from './components/Controlled/AsyncSelectController';

const controlTypeControllerMapping = {
	text               : InputController,
	number             : InputNumberController,
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
	checkBox           : CheckboxController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
