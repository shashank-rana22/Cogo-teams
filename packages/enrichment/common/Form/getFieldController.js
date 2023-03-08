import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	MultiselectController,
	SelectController,
	MobileNumberController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text         : InputController,
	number       : InputController,
	select       : SelectController,
	multiSelect  : MultiselectController,
	asyncSelect  : AsyncSelectController,
	datePicker   : DatepickerController,
	mobileNumber : MobileNumberController,

};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
