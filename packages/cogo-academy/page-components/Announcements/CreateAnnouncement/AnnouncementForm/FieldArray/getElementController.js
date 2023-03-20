import { InputController, MultiselectController, SelectController } from '@cogoport/forms';

const CONTROL_MAPPING = {
	text        : InputController,
	select      : SelectController,
	multiSelect : MultiselectController,
};

export const getElementController = (type = 'text') => (
	CONTROL_MAPPING[type] || SelectController
);
