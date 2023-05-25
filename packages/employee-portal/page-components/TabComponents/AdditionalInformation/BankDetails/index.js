import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeBankDetails from '../../../../hooks/useCreateEmployeeBankDetails';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

function BankDetails() {
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { data: info } = useGetEmployeeDetails({});

	const { bank_details = [], detail } = info || {};

	const {
		account_holder_name, account_number, bank_branch_name,
		bank_name, cancelled_check_url, ifsc_code,
	} = bank_details?.[0] || {};

	const { id } = detail || {};

	const { createEmployeeBankDetails } = useCreateEmployeeBankDetails({ bank_details });

	const removeTypeField = (controlItem) => {
		const { type, ...rest } = controlItem;
		return rest;
	};

	const onSubmit = (values) => {
		createEmployeeBankDetails({ data: values, id });
	};

	useEffect(() => {
		setValue('ifsc_code', ifsc_code);
		setValue('account_holder_name', account_holder_name);
		setValue('bank_name', bank_name);
		setValue('branch_name', bank_branch_name);
		setValue('bank_account_number', account_number);
		setValue('cancelled_cheque', cancelled_check_url);
	}, [account_holder_name,
		account_number, bank_branch_name, bank_details, bank_name, cancelled_check_url, ifsc_code, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				Please update your bank details here !
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
									{...(type === 'fileUpload'
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
			<Button
				size="md"
				type="button"
				className={styles.button}
				onClick={
						handleSubmit(onSubmit)
					}
			>
				Save
			</Button>
		</div>
	);
}

export default BankDetails;
