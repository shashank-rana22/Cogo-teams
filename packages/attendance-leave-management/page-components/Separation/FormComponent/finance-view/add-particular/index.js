import { Button } from '@cogoport/components';
import { InputController, SelectController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

let ID = GLOBAL_CONSTANTS.zeroth_index;
const data = [
	{
		label : 'Bonus',
		value : 'Bonus',
	},
	{
		label : 'Loan',
		value : 'Loan',
	}, {
		label : 'Gift',
		value : 'Gift',
	},
];

function AddParticular({
	addParticular = false,
	setAddParticular = () => {},
	setUpdateData = () => {},

}) {
	const { control, formState:{ errors }, handleSubmit, reset } = useForm();
	const onSubmit = (values) => {
		setUpdateData((prev) => [...prev,
			{
				id                 : ID + GLOBAL_CONSTANTS.one,
				particular         : values?.particular,
				category           : values?.category,
				recoverable_amount : parseInt(values?.recoverableAmount, 10),
			}]);
		setAddParticular(false);
		ID += GLOBAL_CONSTANTS.one;
		reset();
	};

	return (
		addParticular ? (
			<div className={styles.container}>
				<div className={styles.particular_input_cont}>
					<div className={styles.input_cont_part}>
						<InputController
							control={control}
							placeholder="Type Particular here"
							className={styles.name_input}
							name="particular"
							size="md"
							type="text"
							rules={{ required: '*required' }}
						/>
						{errors?.particular ? (
							<div className={styles.errors}>*required</div>
						) : null}
					</div>

					<div className={styles.input_cont}>
						<SelectController
							control={control}
							placeholder="Select Category"
							className={styles.name_input}
							name="category"
							value=""
							size="md"
							options={data}
							rules={{ required: '*required' }}
						/>
						{errors?.category ? (
							<div className={styles.errors}>*required</div>
						) : null}
					</div>

					<div className={styles.sub_container}>
						<div className={styles.amount_container}>
							<InputController
								control={control}
								placeholder="Type Amount here"
								className={styles.name_input}
								name="recoverableAmount"
								size="md"
								type="number"
								value={GLOBAL_CONSTANTS.zeroth_index}
								rules={{
									required : 'Value must be Greater than 0',
									validate : (value) => (parseInt(value, 10) >= GLOBAL_CONSTANTS.zeroth_index && value
										? true : 'Number must be whole'),
								}}
							/>

							<Button
								size="md"
								themeType="primary"
								className={styles.proceed_modal_btn}
								onClick={handleSubmit(onSubmit)}
							>
								Save
							</Button>
						</div>
						{errors?.recoverableAmount ? (
							<div className={styles.errors_amount}>*Value must be Greater than 0</div>
						) : null}
					</div>

				</div>

			</div>
		)
			: null
	);
}

export default AddParticular;
