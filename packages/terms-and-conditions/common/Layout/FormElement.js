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
const TextAreaController = dynamic(
	() => import('@cogoport/forms').then((module) => module.TextAreaController),
	{ ssr: false },
);
function FormElement({ type = '', ...rest }) {
	if (type === 'select') return <SelectController {...rest} />;

	if (type === 'async_select') return <AsyncSelectController {...rest} />;

	if (type === 'textarea') return <TextAreaController {...rest} />;

	return <InputController {...rest} type={type} />;
}

export default React.memo(FormElement);