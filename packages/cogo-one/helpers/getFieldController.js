import {
	InputController,
	UploadController,
	TextAreaController,
	SelectController,
	CreatableMultiSelectController,
	CheckboxController,
	ToggleController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	select             : SelectController,
	textarea           : TextAreaController,
	uploader           : UploadController,
	text               : InputController,
	'creatable-select' : CreatableMultiSelectController,
	checkbox           : CheckboxController,
	toggle             : ToggleController,

};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
