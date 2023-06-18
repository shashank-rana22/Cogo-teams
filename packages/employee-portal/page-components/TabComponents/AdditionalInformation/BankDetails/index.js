import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeBankDetails from '../../../../hooks/useCreateEmployeeBankDetails';

import controls from './controls';
import styles from './styles.module.css';

const DEFAULT_INDEX = 0;
const CONTROL_TYPE_FILE_UPLOAD = 'fileUpload';

const BANK_DETAILS_MAPPING = [
	'ifsc_code',
	'account_holder_name',
	'bank_name', 'bank_branch_name', 'account_number', 'cancelled_check_url'];

function BankDetails({ getEmployeeDetails, data: info }) {
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { bank_details = [], detail } = info || {};

	const { id } = detail || {};

	const { loading, createEmployeeBankDetails } = useCreateEmployeeBankDetails({ bank_details, getEmployeeDetails });

	const removeTypeField = (controlItem) => {
		const { type, ...rest } = controlItem;
		return rest;
	};

	const onSubmit = (values) => {
		createEmployeeBankDetails({ values, id });
	};

	useEffect(() => {
		(BANK_DETAILS_MAPPING || []).map((element) => (
			setValue(element, bank_details?.[DEFAULT_INDEX]?.[element])
		));
	}, [bank_details, setValue]);

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
