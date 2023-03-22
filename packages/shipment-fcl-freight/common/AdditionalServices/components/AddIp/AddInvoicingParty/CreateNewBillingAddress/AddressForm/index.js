import { useForm } from '@cogoport/forms';
import React from 'react';

import control from './address_controls';

function AddressForm() {
	const { register, handleSubmit, formState: { errors } } = useForm();

	console.log(control, 'control');

	const onSubmit = (data) => console.log(data);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{control.map((field, index) => (
				<div key={index}>
					{field.type === 'select' && (
						<select {...register(field.name, field.rules)}>
							{field.options.map((option, index) => (
								<option key={index} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					)}

					{field.type === 'text' && (
						<input type="text" {...register(field.name, field.rules)} />
					)}

					{field.type === 'location-select' && (
						<select {...register(field.name, field.rules)}>
							{field.defaultOptions && (
								<option value="">Select location</option>
							)}
							{field.optionsListKey
									&& locations[field.optionsListKey].map((option, index) => (
										<option key={index} value={option[field.valueKey]}>
											{option[field.labelKey]}
										</option>
									))}
						</select>
					)}

					{field.type === 'file' && (
						<input type="file" {...register(field.name, field.rules)} />
					)}

					{field.type === 'textarea' && (
						<textarea {...register(field.name, field.rules)} />
					)}

					{field.type === 'checkbox' && (
						<>
							{field.options.map((option, index) => (
								<label key={index}>
									<input
										type="checkbox"
										value={option.value}
										{...register(field.name, field.rules)}
									/>
									{option.label}
								</label>
							))}
						</>
					)}

					{errors[field.name] && (
						<span className="error">{errors[field.name].message}</span>
					)}
				</div>
			))}
			<button type="submit">Submit</button>
		</form>
	);
}

export default AddressForm;
