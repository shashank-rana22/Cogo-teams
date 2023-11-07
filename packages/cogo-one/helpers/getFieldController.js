import {
	InputController,
	UploadController,
	TextAreaController,
	SelectController,
	CreatableMultiSelectController,
	CheckboxController,
	ToggleController,
	AsyncSelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	select             : SelectController,
	textarea           : TextAreaController,
	uploader           : UploadController,
	text               : InputController,
	'creatable-select' : CreatableMultiSelectController,
	checkbox           : CheckboxController,
	toggle             : ToggleController,
	asyncSelect        : AsyncSelectController,

};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
