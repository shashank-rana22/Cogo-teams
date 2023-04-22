import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	MultiselectController,
	SelectController,
	MobileNumberController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
} from '@cogoport/forms';
import dynamic from 'next/dynamic';

const DynamicControlledAceEditor = dynamic(() => import('./ControlledAceEditor'), { ssr: false });

const controlTypeControllerMapping = {
	text         : InputController,
	number       : InputController,
	select       : SelectController,
	multiSelect  : MultiselectController,
	asyncSelect  : AsyncSelectController,
	datePicker   : DatepickerController,
	mobileNumber : MobileNumberController,
	chips        : ChipsController,
	radioGroup   : RadioGroupController,
	textarea     : TextAreaController,
	editor       : DynamicControlledAceEditor,
};

export const getElementController = (type = 'text') => {
	const element = controlTypeControllerMapping[type] || null;

	if (!element) {
		return function () {
			return null;
		};
	}

	return element;
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
