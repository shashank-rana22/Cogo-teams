import { Button, cl } from '@cogoport/components';
import {
	useFieldArray,
	SelectController,
	AsyncSelectController,
	InputController,
	UploadController,
	TextAreaController,
	CheckboxController,
} from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import mobileCountryCodeOptions from '../getCountryCode';
import styles from '../styles.module.css';

import controls from './controls';

const controlTypeMapping = {
	select         : SelectController,
	'async-select' : AsyncSelectController,
	text           : InputController,
	number         : InputController,
	file           : UploadController,
	'text-area'    : TextAreaController,
	checkbox       : CheckboxController,
};

function FormElement({
	name, nameSuffix, show, label, errors, type, isFieldArrayElement = false, ...rest
}) {
	const Element = controlTypeMapping[type];

	return show && Element ? (
		<div className={cl`${styles.input_container} ${styles[rest.className]}`}>
			<label htmlFor={name}>{label}</label>

			<Element name={name} type={type} {...rest} />

			{errors[isFieldArrayElement ? nameSuffix : name] && (
				<span className={styles.errors}>
					{errors[isFieldArrayElement ? nameSuffix : name].message}
				</span>
			)}
		</div>
	) : null;
}

function Form({
	control,
	errors,
	showComponent,
}) {
	const { formControls, pocControls } = controls({ showComponent, mobileCountryCodeOptions });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'poc_details',
	});

	return (
		<form className={styles.form_container}>
			{formControls.map((ctrl) => <FormElement key={ctrl.name} {...ctrl} control={control} errors={errors} />)}

			<h3>POC Details</h3>

			{fields.map((field, index) => (
				<div key={field.id} style={{ flex: '0 0 100%' }}>
					<div className={styles.field_array}>
						{pocControls.map((ctrl) => (
							<FormElement
								key={ctrl.nameSuffix}
								errors={(errors?.poc_details?.[index]?.[ctrl.nameSuffix]
									? { [ctrl.nameSuffix]: errors?.poc_details?.[index]?.[ctrl.nameSuffix] }
									: {}
								)}
								{...ctrl}
								name={`poc_details.${index}.${ctrl.nameSuffix}`}
								control={control}
								nameSuffix={ctrl.nameSuffix}
								isFieldArrayElement
							/>
						))}

						<IcMDelete onClick={() => remove(index)} />
					</div>

				</div>
			))}

			<Button type="button" onClick={() => append({ name: '' })}>
				<IcMPlusInCircle />
				&nbsp;
				Add POC
			</Button>

		</form>
	);
}

export default Form;
