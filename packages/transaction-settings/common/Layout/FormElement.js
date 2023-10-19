import { UploadController } from '@cogoport/forms';
import dynamic from 'next/dynamic';
import React from 'react';

const SelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.SelectController),
	{ ssr: false },
);
const CheckboxController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CheckboxController),
	{ ssr: false },
);
const CheckboxGroupController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CheckboxGroupController),
	{ ssr: false },
);
const AsyncSelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.AsyncSelectController),
	{ ssr: false },
);
const InputNumberController = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputNumberController),
	{ ssr: false },
);
const InputController = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputController),
	{ ssr: false },
);

const InputGroupController = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputGroupController),
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

const ToggleController = dynamic(
	() => import('@cogoport/forms').then((module) => module.ToggleController),
	{ ssr: false },
);

const TextAreaController = dynamic(
	() => import('@cogoport/forms').then((module) => module.TextAreaController),
	{ ssr: false },
);
const InputGroupCotroller = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputGroupController),
	{ ssr: false },
);

const DatepickerController = dynamic(() => import('@cogoport/forms')
	.then((module) => module.DatepickerController), {
	ssr: false,
});

const PillsController = dynamic(() => import('@cogoport/forms')
	.then((module) => module.PillsController), {
	ssr: false,
});

const FieldArrayController = dynamic(() => import('@cogoport/forms')
	.then((module) => module.FieldArrayController), {
	ssr: false,
});

function FormElement({ type = '', ...rest }) {
	if (type === 'select') return <SelectController {...rest} />;

	if (type === 'checkbox') return <CheckboxController {...rest} />;

	if (type === 'checkbox_group') return <CheckboxGroupController {...rest} />;

	if (type === 'async_select') return <AsyncSelectController {...rest} />;

	if (type === 'date_range_picker') return <DateRangePickerController {...rest} />;

	if (type === 'chips') return <ChipsController {...rest} />;

	if (type === 'date') return <DatepickerController {...rest} />;

	if (type === 'multi_select') return <MultiSelectController {...rest} />;

	if (type === 'input-group') return <InputGroupController {...rest} />;

	if (type === 'number') return <InputNumberController {...rest} />;

	if (type === 'textarea') return <TextAreaController {...rest} />;

	if (type === 'toggle') return <ToggleController {...rest} />;
	if (type === 'pills') return <PillsController {...rest} />;
	if (type === 'fieldArray') return <FieldArrayController {...rest} />;
	if (type === 'file') return <UploadController {...rest} />;

	if (type === 'textArea') return <TextAreaController {...rest} />;

	if (type === 'input_group') return <InputGroupCotroller {...rest} />;

	if (type === 'radio') return <RadioGroupController {...rest} />;
	if (type === 'checkbox') return <CheckboxController {...rest} />;
	if (type === 'number') return <InputNumberController {...rest} />;

	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);
