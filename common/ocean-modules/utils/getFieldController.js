import {
	CreatableSelectController,
	ChipsController,
	DatepickerController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
	UploadController,
	TextAreaController,
	CheckboxController,
	AsyncSelectController,
	MobileNumberController,
} from '@cogoport/forms';

const controllerTypeMapping = {
	text            : InputController,
	number          : InputController,
	select          : SelectController,
	multiSelect     : MultiselectController,
	radioGroup      : RadioGroupController,
	asyncSelect     : AsyncSelectController,
	chips           : ChipsController,
	datePicker      : DatepickerController,
	upload          : UploadController,
	creatableSelect : CreatableSelectController,
	textarea        : TextAreaController,
	checkBox        : CheckboxController,
	mobileNumber    : MobileNumberController,
};

const getFieldController = (type = 'text') => controllerTypeMapping[type] || null;

export default getFieldController;
