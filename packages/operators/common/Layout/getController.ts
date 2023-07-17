import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	AsyncSelectController,
	CheckboxController,
	UploadController,
} from '@cogoport/forms';

const ELEMENT_CONTROLLER = {
	text           : InputController,
	textarea       : TextAreaController,
	number         : InputController,
	select         : SelectController,
	file           : UploadController,
	pills          : PillsController,
	checkbox       : CheckboxController,
	date_picker    : DatepickerController,
	'async-select' : AsyncSelectController,
};

const getElementController = (type = 'text') => ELEMENT_CONTROLLER[type];

export default getElementController;
