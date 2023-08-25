import {
	InputController,
	PillsController,
	SelectController,
	DatepickerController,
	TextAreaController,
	AsyncSelectController,
	MobileNumberController,
} from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

const ELEMENT_CONTROLLER = {
	text           : InputController,
	textarea       : TextAreaController,
	number         : InputController,
	select         : SelectController,
	mobile         : MobileNumberController,
	file           : UploadController,
	pills          : PillsController,
	date_picker    : DatepickerController,
	'async-select' : AsyncSelectController,
};

const getElementController = (type = 'text') => ELEMENT_CONTROLLER[type];

export default getElementController;
