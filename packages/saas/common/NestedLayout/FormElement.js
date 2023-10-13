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

const TextAreaController = dynamic(
	() => import('@cogoport/forms').then((module) => module.TextAreaController),
	{ ssr: false },
);

const CountrySelectController = dynamic(
	() => import('@cogoport/forms').then((module) => module.CountrySelectController),
	{ ssr: false },
);
const InputNumberController = dynamic(
	() => import('@cogoport/forms').then((module) => module.InputNumberController),
	{ ssr: false },
);
const DatepickerController = dynamic(
	() => import('@cogoport/forms').then((module) => module.DatepickerController),
	{ ssr: false },
);

function FormElement({ type = '', ...rest }) {
	if (type === 'select') return <SelectController {...rest} />;

	if (type === 'async_select') return <AsyncSelectController {...rest} />;
	if (type === 'async_create_select') return <AsyncSelectController type={type} {...rest} />;

	if (type === 'date_range_picker') return <DateRangePickerController {...rest} />;
	if (type === 'date_picker') return <DatepickerController {...rest} />;
	if (type === 'chips') return <ChipsController {...rest} />;

	if (type === 'multi_select') return <MultiSelectController {...rest} />;

	if (type === 'textarea') return <TextAreaController {...rest} />;

	if (type === 'country_select') return <CountrySelectController {...rest} />;

	if (type === 'number') return <InputNumberController {...rest} />;

	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);
