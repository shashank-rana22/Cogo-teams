import {
	AsyncSelectController,
	InputController,
	MultiselectController,
	SelectController,
	UploadController,
	MobileNumberController,
	CountrywiseTaxNumberSelectController,
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

		case 'countrywise-tax-select':
			return CountrywiseTaxNumberSelectController;

		case 'asyncSelect':
			return AsyncSelectController;

		default:
			return null;
	}
};
