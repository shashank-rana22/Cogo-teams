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
const CheckboxGroupController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CheckboxGroupController),
	{ ssr: false },
);

const CheckboxController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CheckboxController),
	{ ssr: false },
);

function FormElement({ type = '', ...rest }) {
	if (type === 'select') return <SelectController {...rest} />;

	if (type === 'async_select') return <AsyncSelectController {...rest} />;

	if (type === 'date_range_picker') return <DateRangePickerController {...rest} />;

	if (type === 'chips') return <ChipsController {...rest} />;

	if (type === 'multi_select') return <MultiSelectController {...rest} />;

	if (type === 'radio') return <RadioGroupController {...rest} />;

	if (type === 'checkboxGroup') return <CheckboxGroupController {...rest} />;

	if (type === 'checkbox') return <CheckboxController {...rest} />;

	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);
