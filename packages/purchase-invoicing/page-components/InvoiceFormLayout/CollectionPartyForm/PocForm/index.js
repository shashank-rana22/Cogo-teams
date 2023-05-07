import { Button } from '@cogoport/components';
import { InputController, MobileNumberController, useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { EMPTY_POC } from '../../../../constants';

import styles from './styles.module.css';

function PocForm({ control, errors }) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'poc_details',
	});

	return (
		<div>
			{fields?.map((field, index) => (
				<div key={field.id}>
					<div className={styles.flex}>
						<div className={styles.email}>
							<label>POC Name </label>
							<InputController
								name={`poc_details.${index}.name`}
								control={control}
								size="sm"
								rules={{ required: { value: true, message: 'POC Name is required' } }}
							/>
							{errors?.poc_details?.[index]?.name && (
								<div className={`${styles.errors}`}>
									Poc Name is Required
								</div>
							)}
						</div>
						<div className={`${styles.email} ${styles.marginleft}`}>
							<label>Email Address</label>
							<InputController
								control={control}
								name={`poc_details.${index}.email`}
								size="sm"
								rules={{ required: { value: true, message: 'Email is required' } }}
							/>
							{errors?.poc_details?.[index]?.email && (
								<div className={`${styles.errors}`}>
									Email Address is Required
								</div>
							)}
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.form_item_container}>
							<label>Mobile Number</label>
							<MobileNumberController
								control={control}
								name={`poc_details.${index}.mobile_number`}
								size="sm"
								rules={{ required: true }}
							/>
							{errors?.poc_details?.[index]?.mobile_number && (
								<div className={`${styles.errors}`}>
									Mobile Number is Required
								</div>
							)}
						</div>

						<div>
							<label>Alternate Mobile Number (optional)</label>
							<MobileNumberController
								control={control}
								name={`poc_details.${index}.alternate_mobile_number`}
								size="sm"
							/>
							{errors?.poc_details?.[index]?.alternate_mobile_number && (
								<div className={`${styles.errors}`}>
									Alternate Mobile Number is Required
								</div>
							)}
						</div>
					</div>
					<span className={styles.delete}>
						{fields?.length > 1 && (
							<IcMDelete
								className={styles.pointer}
								height={20}
								width={20}
								onClick={() => remove(index)}
							/>
						)}
					</span>
				</div>
			))}
			<div className={styles.addbuttonborder}>
				<Button
					className={styles.addbutton}
					onClick={() => { append(EMPTY_POC); }}
				>
					+ Add More POC
				</Button>
			</div>
		</div>
	);
}

export default PocForm;
