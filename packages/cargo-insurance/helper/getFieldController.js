import {
	InputController,
	MobileNumberController,
	SelectController, DatepickerController, UploadController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text         : InputController,
	number       : InputController,
	select       : SelectController,
	mobileSelect : MobileNumberController,
	datepicker   : DatepickerController,
	fileUpload   : UploadController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
