import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import FieldArray from '../../FieldArray';
import { getController } from '../../getController';

import getMarginControls from './controls';

function Form({
	serviceKey,
	lineItem = {},
	onChange = () => {},
	marginType = 'demand',
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
				type  : 'absolute_total',
				currency,
				value : marginValue,
			}],
		},
	});

	useEffect(() => {
		watch((v) => {
			onChange({
				serviceKey,
				code     : lineItem?.code,
				currency : v[nameKey][0]?.currency,
				type     : v[nameKey][0]?.type,
				value    : Number(v[nameKey][0]?.value),
			});
		});
	}, [lineItem?.code, nameKey, onChange, serviceKey, watch]);

	useEffect(() => {
		const filteredMargins = (lineItem?.margins || []).filter(
			(m) => m.margin_type === marginType,
		);
		if (filteredMargins?.length > 0) {
			const [margin] = filteredMargins;
			let type = margin?.type;
			let value = margin?.value;

			if (type === 'percentage') {
				type = 'absolute_total';
				value = margin?.total_margin_value;
			}
			const prefillValues = { type, value, currency: margin?.currency };
			onChange({ serviceKey, code: lineItem?.code, ...prefillValues });
		}
	}, [lineItem, marginType, onChange, serviceKey]);

	return (
		<>
			{marginControls.map((controItem) => {
				const { type, label } = controItem;

				// if (!show) {
				// 	return null;
				// }

				if (type === 'fieldArray') {
					return <FieldArray control={control} {...controItem} />;
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
