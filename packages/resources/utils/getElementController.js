import {
	CreatableMultiSelectController, InputController, MultiselectController,
	SelectController, AsyncSelectController, CheckboxController,
} from '@cogoport/forms';
import TextAreaController from '@cogoport/forms/page-components/Controlled/TextAreaController';

const elementControllers = {
	text                  : InputController,
	select                : SelectController,
	multiSelect           : MultiselectController,
	number                : InputController,
	creatable_multiselect : CreatableMultiSelectController,
	text_area             : TextAreaController,
	async_select          : AsyncSelectController,
	checkbox              : CheckboxController,
};

export const getElementController = (type = 'text') => elementControllers[type] || null;
