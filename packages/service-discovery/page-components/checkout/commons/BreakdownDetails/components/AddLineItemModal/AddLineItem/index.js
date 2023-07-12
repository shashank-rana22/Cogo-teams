import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

import getElementController from '../../../../forms/getElementController';

import { getlineItemControls } from './getlineItemControls';
import styles from './styles.module.css';

function AddLineItem({ CHARGE_CODE_DATA, service_id, checkout_id }, ref) {
	const [unitOptions, setUnitOptions] = useState([]);

	const { control, watch, handleSubmit, formState:{ errors } } = useForm();

	const { code, unit } = watch();

	const controls = getlineItemControls(
		CHARGE_CODE_DATA,
		unit,
	);

	useEffect(() => {
		if (!isEmpty(code)) {
			const { units = [] } = CHARGE_CODE_DATA[code];

			setUnitOptions(units.map((val) => ({ label: `${val}`, value: `${val}` })));
		}
	}, [CHARGE_CODE_DATA, code]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				const payloadValues = {
					id                : checkout_id,
					line_items_to_add : {
						[service_id]: [
							{
								code     : CHARGE_CODE_DATA[values?.code]?.code,
								unit     : values.unit,
								currency : values.currency,
								price    : Number(values.price),
								...(unit === 'per_wm' ? {
									cbm_weight_ratio: Number(
										values.cbm_weight_ratio,
									),
								} : {}),
							},
						],
					},
					get_checkout_data: true,
				};

				return {
					hasError : false,
					values   : payloadValues,
				};
			};

			const onError = (error) => ({ hasError: true, error });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, name, label } = controlItem || {};

				const Element = getElementController(type);

				if (!Element) return null;

				return (
					<div key={name} className={styles.form_group}>
						<div className={styles.label}>
							{label}
						</div>

						<div className={styles.input_group}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
								{...(name === 'unit' ? { options: unitOptions } : {})}
							/>
						</div>

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default forwardRef(AddLineItem);
