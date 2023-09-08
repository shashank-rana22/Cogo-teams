import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useImperativeHandle, forwardRef, useEffect } from 'react';

import getElementController from '../../../../forms/getElementController';

import { getlineItemControls } from './getlineItemControls';
import styles from './styles.module.css';

const LENGTH_TO_PRESELECT = 1;

function EditLineItem({ lineItemOptions = [], service_type = '', lineItems = [], detail = {} }, ref) {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const controls = getlineItemControls({ lineItems: lineItemOptions });

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				const val = values.line_item;

				const code = lineItems.find((item) => item.name === val)?.code;

				const payloadValues = {
					service           : service_type,
					code,
					alias             : values.name,
					organization_id   : detail.importer_exporter_id,
					performed_by_id   : detail.importer_exporter_id,
					performed_by_type : detail.importer_exporter_id,
				};

				return {
					hasError : false,
					values   : payloadValues,
					code,
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

	useEffect(() => {
		if (lineItemOptions.length === LENGTH_TO_PRESELECT) {
			setValue('line_item', lineItemOptions[GLOBAL_CONSTANTS.zeroth_index].value);
		}
	}, [lineItemOptions, setValue]);

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, name, label } = controlItem || {};

				const Element = getElementController(type);

				if (!Element) return null;

				return (
					<div key={name} className={styles.form_group}>
						<div className={styles.label}>{label}</div>

						<div className={styles.input_group}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
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

export default forwardRef(EditLineItem);