import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeBankDetails from '../../../../hooks/useCreateEmployeeBankDetails';

import controls from './controls';
import styles from './styles.module.css';

const DEFAULT_INDEX = 0;
const INITIAL_INDEX = 1;
const CONTROL_TYPE_FILE_UPLOAD = 'fileUpload';

const BANK_DETAILS_MAPPING = [
	'ifsc_code',
	'account_holder_name',
	'bank_name', 'bank_branch_name', 'account_number', 'account_number_confirmation', 'cancelled_check_url'];

function BankDetails({ getEmployeeDetails, data: info }) {
	const { handleSubmit, control, formState: { errors }, setValue, watch } = useForm();

	const bankAccountNumber = watch(['account_number', 'account_number_confirmation']);

	const { bank_details = [], detail } = info || {};

	const { id } = detail || {};

	const { loading, createEmployeeBankDetails } = useCreateEmployeeBankDetails({ bank_details, getEmployeeDetails });

	const removeTypeField = (controlItem) => {
		const { type, ...rest } = controlItem;
		return rest;
	};

	const onSubmit = (values) => {
		if (bankAccountNumber[DEFAULT_INDEX] === bankAccountNumber[INITIAL_INDEX]) {
			createEmployeeBankDetails({ values, id });
		} else {
			Toast.error('Bank Account Number in both the fields should be same');
		}
	};

	useEffect(() => {
		(BANK_DETAILS_MAPPING || []).forEach((element) => {
			if (element === 'account_number_confirmation') {
				setValue(element, bank_details?.[DEFAULT_INDEX]?.account_number);
			} else {
				setValue(element, bank_details?.[DEFAULT_INDEX]?.[element]);
			}
		});
	}, [bank_details, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				Please make sure to enter accurate bank details so that your salary can be credited to this account.
				Cogoport will not be held responsible if the salary is deposited into an incorrect bank account.
			</div>

			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, label, name: controlName } = controlItem || {};
					const Element = getElementController(type);

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element
									{...(type === CONTROL_TYPE_FILE_UPLOAD
										? removeTypeField(controlItem) : { ...controlItem })}
									control={control}
									key={controlName}
									className={styles[`element_${controlName}`]}
								/>

								{errors[controlName]?.message
									? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
							</div>
						</div>
					);
				})}
			</div>

			<div className={styles.button}>
				<Button
					size="md"
					type="button"
					loading={loading}
					onClick={
						handleSubmit(onSubmit)
					}
				>
					Save
				</Button>
			</div>

		</div>
	);
}

export default BankDetails;
