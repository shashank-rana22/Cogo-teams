import {
	AsyncSelectController,
	InputController, MultiselectController, SelectController,
	UploadController, TextAreaController, SingleDateRangeController,
	// CountrySelectController,
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

		case 'textArea':
			return TextAreaController;

		case 'asyncSelect':
			return AsyncSelectController;

		case 'singleDateRange':
			return SingleDateRangeController;

			// case 'countrySelect':
			// 	return CountrySelectController;

		default:
			return null;
	}
};
