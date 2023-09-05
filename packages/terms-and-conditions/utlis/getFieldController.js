import {
	InputController,
	UploadController,
	CreatableMultiSelectController, TextAreaController,
	SelectController,
	CheckboxController,
	AsyncSelectController,

} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	select             : SelectController,
	textarea           : TextAreaController,
	'creatable-select' : CreatableMultiSelectController,
	uploader           : UploadController,
	text               : InputController,
	'async-select'     : AsyncSelectController,
	checkbox           : CheckboxController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
