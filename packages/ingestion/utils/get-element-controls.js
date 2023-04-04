import {
	AsyncSelectController,
	InputController, MultiselectController, SelectController,
	UploadController, TextAreaController, SingleDateRangeController,
} from '@cogoport/forms';

export const getElementController = (type = 'text') => {
	const ELEMENT_MAPPING = {
		text            : InputController,
		select          : SelectController,
		multiSelect     : MultiselectController,
		file            : UploadController,
		textArea        : TextAreaController,
		asyncSelect     : AsyncSelectController,
		singleDateRange : SingleDateRangeController,
	};

	return ELEMENT_MAPPING[type];
};
