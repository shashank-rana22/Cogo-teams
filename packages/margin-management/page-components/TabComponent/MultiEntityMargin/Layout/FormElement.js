import dynamic from 'next/dynamic';
import React from 'react';

const SelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.SelectController),
	{ ssr: false },
);
const AsyncSelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.AsyncSelectController),
	{ ssr: false },
);
const InputController = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputController),
	{ ssr: false },
);
const DateRangePickerController = dynamic(
	() => import('@cogoport/forms').then((module) => module.DateRangePickerController),
	{ ssr: false },
);

const ChipsController = dynamic(
	() => import('@cogoport/forms').then((module) => module.ChipsController),
	{ ssr: false },
);

const MultiSelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.MultiselectController),
	{ ssr: false },
);
const RadioGroupController = dynamic(
	() => import('@cogoport/forms').then((module) => module.RadioGroupController),
	{ ssr: false },
);

const CONTROLLER_MAPPING = {
	select            : SelectController,
	async_select      : AsyncSelectController,
	date_range_picker : DateRangePickerController,
	chips             : ChipsController,
	multi_select      : MultiSelectController,
	radio             : RadioGroupController,
};

function FormElement({ type = '', ...rest }) {
	const Controller = CONTROLLER_MAPPING[type] || null;

	if (Controller) {
		return <Controller {...rest} />;
	}

	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);
