import {
	InputController,
	MultiselectController,
	SelectController,
	UploadController,
	MobileNumberController,
} from '@cogoport/forms';

export const getElementController = (type = 'text') => {
	switch (type) {
		case 'text':
			return InputController;

		case 'select':
			return SelectController;

		case 'multiSelect':
			return MultiselectController;

		case 'file':
			return UploadController;

		case 'mobile-number-select':
			return MobileNumberController;

		default:
			return null;
	}
};
