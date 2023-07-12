import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

import FieldArray from '../../../forms/FieldArray';
import getElementController from '../../../forms/getElementController';

import getControls from './getControls';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function ContainerForm({
	checkout_approvals,
	servicesApplicable,
	onSubmit,
}, ref) {
	const controls = [
		getControls({
			manager_approval_proof:
				checkout_approvals?.[GLOBAL_CONSTANTS.zeroth_index]
					?.manager_approval_proof,
		}).commonControls,
		...servicesApplicable.map(
			(item) => getControls({
				item,
				manager_approval_proof:
						checkout_approvals?.[GLOBAL_CONSTANTS.zeroth_index]
							?.manager_approval_proof,
			}).restControls,
		),
	];

	const finalControls = controls.flat(Infinity);

	const {
		formState: { errors },
		handleSubmit,
		setValue,
		control,
	} = useForm();

	useEffect(() => {
		setValue(
			'cargo_readiness_date',
			servicesApplicable?.[GLOBAL_CONSTANTS.zeroth_index]?.cargo_readiness_date,
		);
	}, [servicesApplicable, setValue]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
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
		<form>
			{finalControls.map((controlItem) => {
				const { type, label, name, style = {} } = controlItem || {};

				if (type === 'fieldArray') {
					return (
						<div key={name} style={style}>
							<FieldArray
								{...controlItem}
								control={control}
								error={errors?.[name]}
							/>
						</div>
					);
				}

				const Element = getElementController(type);

				if (!Element) return null;

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>{label}</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								control={control}
								{...(type === 'fileUpload'
									? removeTypeField(controlItem) : { ...controlItem })}
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
		</form>
	);
}

export default forwardRef(ContainerForm);
