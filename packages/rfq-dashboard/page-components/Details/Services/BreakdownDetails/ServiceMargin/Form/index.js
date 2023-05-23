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

	const marginControls = getMarginControls(lineItem, nameKey);
	const { control, watch } = useForm();

	useEffect(() => {
		watch((v) => {
			onChange({
				serviceKey,
				code     : lineItem?.code,
				currency : v[nameKey][0].currency,
				type     : v[nameKey][0].type,
				value    : Number(v[nameKey][0].value),
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
				const { type, label, show } = controItem;

				if (!show) {
					return null;
				}

				if (type === 'feildArray') {
					return <FieldArray control={control} {...controItem} />;
				}

				const Element = getController(type);

				return (
					<>
						<div>
							{label}
						</div>
						<Element control={control} {...controItem} />
					</>
				);
			})}

		</>
	);
}

export default Form;
