import dynamic from 'next/dynamic';
import React from 'react';

const SelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.SelectController),
	{ ssr: false },
);
const CreatableSelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CreatableSelectController),
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
const DatepickerController = dynamic(
	() => import('@cogoport/forms').then((module) => module.DatepickerController),
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

function FormElement({ type = '', ...rest }) {
	if (type === 'select') return <SelectController {...rest} />;

	if (type === 'async_select') return <AsyncSelectController {...rest} />;
	if (type === 'async_create_select') return <AsyncSelectController type={type} {...rest} />;

	if (type === 'date_range_picker') return <DateRangePickerController {...rest} />;

	if (type === 'chips') return <ChipsController {...rest} />;

	if (type === 'date_picker') return <DatepickerController {...rest} />;

	if (type === 'multi_select') return <MultiSelectController {...rest} />;
	if (type === 'creatable_select') return <CreatableSelectController {...rest} />;
	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);
