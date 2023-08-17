import {
	AsyncSelectController,
	InputController,
	MultiselectController,
	SelectController,
	UploadController,
	MobileNumberController,
	CountrywiseTaxNumberSelectController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	text                     : InputController,
	number                   : InputController,
	select                   : SelectController,
	multiSelect              : MultiselectController,
	file                     : UploadController,
	'mobile-number-select'   : MobileNumberController,
	'countrywise-tax-select' : CountrywiseTaxNumberSelectController,
	asyncSelect              : AsyncSelectController,
};

export const getElementController = (type = 'text') => CONTROLLER_MAPPING[type];
