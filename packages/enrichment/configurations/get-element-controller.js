import {
	InputController,
	SelectController,
	MultiselectController,
	UploadController,
	MobileNumberController,
	CountrywiseTaxNumberSelectController,
	AsyncSelectController,
} from '@cogoport/forms';

const elementControllers = {
	text                     : InputController,
	select                   : SelectController,
	multiSelect              : MultiselectController,
	file                     : UploadController,
	'mobile-number-select'   : MobileNumberController,
	'countrywise-tax-select' : CountrywiseTaxNumberSelectController,
	asyncSelect              : AsyncSelectController,
};

export const getElementController = (type = 'text') => elementControllers[type] || null;
