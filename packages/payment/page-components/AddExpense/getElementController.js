import {
	SelectController,
	InputController,
	UploadController,
	DatepickerController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	select        : SelectController,
	input         : InputController,
	'date-picker' : DatepickerController,
	fileUpload    : UploadController,
};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || null;
}

export default getElementController;
