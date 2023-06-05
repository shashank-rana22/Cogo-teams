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

	console.log('lineItem::', lineItem);

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
		values: {
			[nameKey]: [{
				type  : 'absolute_total',
				currency,
				value : marginValue,
			}],
		},
	});

	// useEffect(() => {
	// 	setValue([nameKey][0],	{
	// 		type  : 'absolute_total',
	// 		currency,
	// 		value : marginValue,
	// 	});
	// }, [currency, marginValue, nameKey, setValue]);

	// useEffect(() => {
	// 	onChange({
	// 		serviceKey,
	// code     : lineItem?.code,
	// currency : lineItem?.currency,
	// type     : lineItem?.type,
	// value    : marginValue,
	// 	});
	// }, [lineItem?.code, lineItem?.currency, lineItem?.type, marginValue, onChange, serviceKey]);

	useEffect(() => {
		// console.log('watch::', watch());
		watch((v) => {
			onChange({
				serviceKey,
				code     : lineItem?.code,
				currency : v[nameKey][0]?.currency,
				type     : v[nameKey][0]?.type,
				value    : Number(v[nameKey][0]?.value),
			});
		});
	}, [lineItem, nameKey, onChange, serviceKey, watch]);

	// useEffect(() => {
	// 	onChange({
	// 		serviceKey,
	// 		code     : lineItem?.code,
	// 		currency : v[nameKey][0]?.currency,
	// 		type     : v[nameKey][0]?.type,
	// 		value    : Number(v[nameKey][0]?.value),
	// 	});
	// }, []);

	// useEffect(() => {
	// 	watch((v)=>{
	// 		onChange({
	// 			serviceKey,

	// 		})
	// 	})
	// }, [lineItem]);
	console.log(lineItem, 'lineItem');
	console.log(watch(), 'watch');
	return (
		<>
			{marginControls.map((controItem) => {
				const { type: form_type, label, name } = controItem;

				if (form_type === 'fieldArray') {
					return <FieldArray key={name} control={control} {...controItem} />;
				}

				const Element = getController(type);

				return (
					<React.Fragment key={name}>
						<div>
							{label}
						</div>
						<Element
							control={control}
							{...controItem}
							width="133px"
							height=" 32px"
						/>
					</React.Fragment>
				);
			})}

		</>
	);
}

export default Form;
