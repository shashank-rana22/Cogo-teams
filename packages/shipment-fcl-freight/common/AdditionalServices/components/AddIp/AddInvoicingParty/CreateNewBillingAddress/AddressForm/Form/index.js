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

function Form({
	control,
	useFieldArray,
	register = () => {},
	errors,
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'poc_details',
	});

	return (
		<form className={styles.form_container}>
			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="name">Billing Party Name</label>
					<InputController
						name="name"
						control={control}
						size="sm"
						rules={{ required: { value: true, message: 'Name is required' } }}
					/>
					{errors.name && <span>This field is required</span>}
				</div>
				<div className={styles.input_container}>
					<label htmlFor="address_type">Address Type</label>
					<SelectController
						name="address_type"
						control={control}
						size="sm"
						options={[
							{ label: 'Office', value: 'office' },
							{ label: 'Factory', value: 'factory' },
							{ label: 'Warehouse Address', value: 'warehouse_address' },
						]}
						rules={{ required: { value: true, message: 'Address Type is required' } }}
					/>
					{errors.address_type && <span>This field is required</span>}
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="country_of_registration">Country of Registration</label>
					<AsyncSelectController
						name="country_id"
						asyncKey="list_locations"
						initialCall={false}
						control={control}
						placeholder="Select Country"
						params={{
							filters: { type: ['country'] },
						}}
						rules={{ required: { value: true, message: 'Country of Registration is required' } }}
					/>
					{errors.country_id && <span>This field is required</span>}
				</div>
				<div className={styles.input_container}>
					<label htmlFor="pincode">Pincode</label>
					<AsyncSelectController
						name="pincode"
						asyncKey="list_locations"
						valueKey="postal_code"
						initialCall={false}
						control={control}
						placeholder="Select Pincode"
						params={{
							filters: { type: ['pincode'] },
						}}
						rules={{ required: { value: true, message: 'Pincode is required' } }}
					/>
					{errors.pincode && <span>This field is required</span>}
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.input_container}>
					<label htmlFor="address">Address</label>
					<TextAreaController
						name="address"
						control={control}
						rules={{
							required: {
								value: true,
							},
						}}
						rows={4}
					/>
					{errors.address && <span>This field is required</span>}
				</div>
				<div className={styles.input_container}>
					<label htmlFor="gst_proof">GST Proof</label>
					<UploadController
						name="gst_proof"
						control={control}
						// rules={{
						// 	required: {
						// 		value: true,
						// 	},
						// }}
						rows={4}
					/>
					{errors.gst_proof && <span>This field is required</span>}
				</div>
			</div>
			<div className={styles.flex}>
				<div className={styles.input_container}>
					<CheckboxController
						name="is_sez"
						label="Is Sez"
						control={control}
					/>
					<div />
				</div>
			</div>

			<h3>POC Details</h3>
			{fields.map((field, index) => (
				<div key={field.id}>
					<div className={styles.field_array}>
						<div className={styles.input_container}>
							<label htmlFor="name">POC Name</label>
							<InputController
								name="name"
								control={control}
								{...register(`poc_details.${index}.name`)}
								size="sm"
								rules={{ required: { value: true, message: 'POC Name is required' } }}
							/>
						</div>
						<div className={styles.input_container}>
							<label htmlFor="email">POC Email</label>
							<InputController
								name="email"
								control={control}
								{...register(`poc_details.${index}.email`)}
								size="sm"
								rules={{ required: { value: true, message: 'POC Email is required' } }}
							/>
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
						</div>
						<IcMDelete onClick={() => remove(index)} />
					</div>

				</div>
			))}

			<Button type="button" onClick={() => append({ name: '' })}>
				<IcMPlusInCircle />
				&nbsp;
				Add Item
			</Button>
		</form>

	);
}

export default Form;
