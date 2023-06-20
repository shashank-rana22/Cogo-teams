import {
	InputController,
	UploadController,
	CreatableMultiSelectController, TextAreaController,
	SelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	select             : SelectController,
	textarea           : TextAreaController,
	'creatable-select' : CreatableMultiSelectController,
	uploader           : UploadController,
	text               : InputController,

};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
