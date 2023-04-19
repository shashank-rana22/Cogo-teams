import { Button } from '@cogoport/components';
import {
	CheckboxController,
	AsyncSelectController, InputController, SelectController,
	TextAreaController, UploadController,
} from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import React from 'react';

import mobileCountryCodeOptions from '../getCountryCode';
import styles from '../styles.module.css';

import controls from './controls';

function Form({
	control,
	useFieldArray,
	register = () => {},
	errors,
	showComponent,
}) {
	const formControls = controls({ showComponent });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'poc_details',
	});

	const renderForm = (field) => {
		switch (field.type) {
			case 'async-select':
				return (
					field.show
						? (
							<div className={styles.input_container}>
								<label>{field.label}</label>
								<AsyncSelectController
									name={field.name}
									asyncKey={field.asyncKey}
									valueKey={field.valueKey}
									initialCall={false}
									control={control}
									size="sm"
									placeholder={field.placeholder}
									params={field.params}
									rules={field.rules}
								/>
								{errors[field.name] && <span>{errors[field.name].message}</span>}
							</div>
						) : null
				);
			case 'input':
				return (
					field.show
						? (
							<div className={styles.input_container}>
								<label htmlFor={field.name}>{field.label}</label>
								<InputController
									name={field.name}
									control={control}
									size="sm"
									placeholder={field.placeholder}
									rules={field.rules}
								/>
								{errors[field.name] && <span>{errors[field.name].message}</span>}
							</div>
						) : null
				);
			case 'select':
				return (
					field.show
						? (
							<div className={styles.input_container}>
								<label>{field.label}</label>
								<SelectController
									name={field.name}
									control={control}
									size="sm"
									options={field.options}
									placeholder={field.placeholder}
									rules={field.rules}
								/>
								{errors[field.name] && <span>{errors[field.name].message}</span>}
							</div>
						) : null
				);
			case 'file':
				return (
					field.show
						? (
							<div className={styles.input_container}>
								<label>{field.label}</label>
								<UploadController
									name={field.name}
									control={control}
									size="sm"
									rules={field.rules}
								/>
								{errors[field.name] && <span>{errors[field.name].message}</span>}
							</div>
						) : null
				);
			case 'checkbox':
				return (
					field.show
						? (
							<div className={` ${styles.input_container} ${styles.is_sez}`}>
								<CheckboxController
									name={field.name}
									control={control}
								/>
								<label>{field.label}</label>
							</div>
						) : null
				);
			case 'text-area':
				return (
					field.show
						? (
							<div className={styles.input_container}>
								<label>{field.label}</label>
								<TextAreaController
									name={field.name}
									control={control}
									rules={{
										required: {
											value: true, message: 'Address is required',
										},
									}}
									rows={4}
								/>
								{errors[field.name] && <span>{errors[field.name].message}</span>}
							</div>
						) : null
				);
			default:
				return null;
		}
	};

	return (
		<form className={styles.form_container}>
			{ formControls.map((field) => renderForm(field))}

			<h3>POC Details</h3>
			{fields.map((field, index) => (
				<div key={field.id} style={{ flex: '0 0 100%' }}>
					<div className={styles.field_array}>
						<div className={styles.input_container}>
							<label htmlFor="name">POC Name</label>
							<InputController
								name="name"
								control={control}
								{...register(`poc_details.${index}.name`)}
								size="sm"
								rules={{ required: { value: true, message: 'Name is required' } }}
							/>
							{errors.poc_details && (
								<span>
									{errors.poc_details[index]?.name?.message}
								</span>
							)}
						</div>
						<div className={styles.input_container}>
							<label htmlFor="email">POC Email</label>
							<InputController
								name="email"
								control={control}
								{...register(`poc_details.${index}.email`)}
								size="sm"
								rules={{ required: { value: true, message: 'Email is required' } }}
							/>
							{errors.poc_details && (
								<span>
									{errors.poc_details[index]?.email?.message}
								</span>
							)}
						</div>
						<div className={styles.input_container}>
							<label htmlFor="mobile_country_code">Country Code</label>
							<SelectController
								name="mobile_country_code"
								control={control}
								size="sm"
								{...register(`poc_details.${index}.mobile_country_code`)}
								options={mobileCountryCodeOptions}
								rules={{ required: { value: true, message: 'Country Code is required' } }}
							/>
							{errors.poc_details && (
								<span>
									{errors.poc_details[index]?.mobile_country_code?.message}
								</span>
							)}
						</div>
						<div className={styles.input_container}>
							<label htmlFor="mobile_number">Mobile Number</label>
							<InputController
								name="mobile_number"
								control={control}
								size="sm"
								{...register(`poc_details.${index}.mobile_number`)}
								rules={{ required: { value: true, message: 'Mobile Number is required' } }}
							/>
							{errors.poc_details && (
								<span>
									{errors.poc_details[index]?.mobile_number?.message}
								</span>
							)}
						</div>
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
