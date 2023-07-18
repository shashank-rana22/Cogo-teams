import {
	InputController,
	SelectController,
	MultiselectController,
	MobileNumberController,
	CountrywiseTaxNumberSelectController,
	AsyncSelectController,
	DatepickerController,
} from '@cogoport/forms';

const elementControllers = {
	text                     : InputController,
	number                   : InputController,
	select                   : SelectController,
	multiSelect              : MultiselectController,
	asyncSelect              : AsyncSelectController,
	datePicker               : DatepickerController,
	mobileNumber             : MobileNumberController,
	'mobile-number-select'   : MobileNumberController,
	'countrywise-tax-select' : CountrywiseTaxNumberSelectController,

};

export const getElementController = (type = 'text') => elementControllers[type] || null;
