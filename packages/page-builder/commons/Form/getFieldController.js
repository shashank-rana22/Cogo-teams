import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	MultiselectController,
	SelectController,
	MobileNumberController,
	CreatableMultiSelectController,
	CreatableSelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text                 : InputController,
	number               : InputController,
	select               : SelectController,
	multiSelect          : MultiselectController,
	asyncSelect          : AsyncSelectController,
	datePicker           : DatepickerController,
	mobileNumber         : MobileNumberController,
	creatableMultiSelect : CreatableMultiSelectController,
	creatableSelect      : CreatableSelectController,

};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
