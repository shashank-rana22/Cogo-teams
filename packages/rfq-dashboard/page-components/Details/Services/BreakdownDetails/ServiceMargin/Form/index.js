import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import FieldArray from '../../FieldArray';
import { getController } from '../../getController';

import getMarginControls from './controls';

function Form({
	serviceKey,
	lineItem = {},
	onChange = () => { },
	id_prefix,
}) {
	const nameKey = id_prefix ? `${id_prefix}_edit_margin` : 'edit_margin';

	const {
		value = 0,
		type,
		total_margin_value,
	} = (lineItem?.margins || []).find(
		(margin) => margin?.margin_type === 'demand',
	) || {};

	let marginValue = value;
	if (type === 'percentage') {
		marginValue = total_margin_value;
	}

	const { currency } = lineItem;

	const marginControls = getMarginControls(nameKey);
	const { control, watch } = useForm({
		defaultValues: {
			[nameKey]: [{
				type: 'absolute_total',

				currency,
				value: marginValue,
			}],
		},
	});

	useEffect(() => {
		watch((v) => {
			onChange({
				serviceKey,
				code: lineItem?.code,

				currency: v[nameKey][0]?.currency,

				type: v[nameKey][0]?.type,

				value: Number(v[nameKey][0]?.value),
			});
		});
	}, [lineItem?.code, nameKey, onChange, serviceKey, watch]);

	return (
		<>
			{marginControls.map((controItem) => {
				const { type: form_type, label } = controItem;

				if (form_type === 'fieldArray') {
					return <FieldArray control={control} {...controItem} key={label} />;
				}

				const Element = getController(type);

				return (
					<>
						<div>
							{label}
						</div>
						<Element
							control={control}
							{...controItem}
							width="133px"
							height=" 32px"
						/>
					</>
				);
			})}

		</>
	);
}

export default Form;
