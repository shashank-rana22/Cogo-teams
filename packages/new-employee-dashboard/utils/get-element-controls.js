import {
	AsyncSelectController,
	InputController, MultiselectController, SelectController, TextAreaController,
} from '@cogoport/forms';

export const getElementController = (type = 'text') => {
	const ELEMENT_MAPPING = {
		text        : InputController,
		number      : InputController,
		select      : SelectController,
		multiSelect : MultiselectController,
		textArea    : TextAreaController,
		asyncSelect : AsyncSelectController,
	};

	return ELEMENT_MAPPING[type];
};
