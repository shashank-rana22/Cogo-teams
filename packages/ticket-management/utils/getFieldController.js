import {
	UploadController,
	CreatableMultiSelectController, TextAreaController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	select             : SelectController,
	textarea           : TextAreaController,
	'creatable-select' : CreatableMultiSelectController,
	uploader           : UploadController,

};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
