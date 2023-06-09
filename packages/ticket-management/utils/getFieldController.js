import {
	InputController,
	UploadController,
	CreatableMultiSelectController, TextAreaController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	select             : SelectController,
	textarea           : TextAreaController,
	'creatable-select' : CreatableMultiSelectController,
	uploader           : UploadController,
	text               : InputController,

};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
