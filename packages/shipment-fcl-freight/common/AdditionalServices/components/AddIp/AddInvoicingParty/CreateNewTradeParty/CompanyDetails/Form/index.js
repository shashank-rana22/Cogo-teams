import { UploadController, AsyncSelectController, SelectController, InputController } from '@cogoport/forms';
import React, { useEffect } from 'react';

import controls from './controls';
import styles from './styles.module.css';

function Form({
	control, onSubmitOfCompanyDetails, handleSubmit, errors, setValue = () => {},
	filledDetails = {}, watch,
}) {
	const { registration_number, business_name, company_type, country_id } = filledDetails;
	useEffect(() => {
		setValue('registration_number', registration_number);
		setValue('business_name', business_name);
		setValue('company_type', company_type);
		setValue('country_id', country_id);
	}, [registration_number, business_name, company_type, country_id, setValue]);

	const { formControl } = controls({ watch });

	const renderForm = (field) => {
		switch (field.type) {
			case 'async-select':
				return (
					<div className={styles.input_container}>
						<label>{field.label}</label>
						<AsyncSelectController
							name={field.name}
							asyncKey={field.asyncKey}
							initialCall={false}
							control={control}
							placeholder={field.placeholder}
							params={field.params}
							rules={field.rules}
						/>
						{errors[field.name] && <span>{errors[field.name].message}</span>}
					</div>
				);
			case 'input':
				return (
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
				);
			case 'select':
				return (
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
				);
			case 'file':
				return (
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
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmitOfCompanyDetails)} className={styles.form_container}>
				{ formControl.map((field) => renderForm(field))}
			</form>
		</div>
	);
}

export default Form;
