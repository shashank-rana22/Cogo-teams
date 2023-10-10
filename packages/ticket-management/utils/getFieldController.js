import {
	InputController,
	UploadController,
	CreatableMultiSelectController, TextAreaController,
	SelectController,
	CheckboxController,
	ToggleController,
	AsyncSelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	select             : SelectController,
	textarea           : TextAreaController,
	'creatable-select' : CreatableMultiSelectController,
	uploader           : UploadController,
	text               : InputController,
	checkbox           : CheckboxController,
	toggle             : ToggleController,
	asyncSelect        : AsyncSelectController,

};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
