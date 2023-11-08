import {
	InputController, MobileNumberController, SelectController,
	DatepickerController, UploadController, AsyncSelectController, ChipsController, CheckboxController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text         : InputController,
	number       : InputController,
	select       : SelectController,
	mobileSelect : MobileNumberController,
	datepicker   : DatepickerController,
	fileUpload   : UploadController,
	asyncSelect  : AsyncSelectController,
	chips        : ChipsController,
	checkbox     : CheckboxController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
