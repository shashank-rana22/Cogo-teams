import { Button } from '@cogoport/components';
import { useForm, InputController, SelectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import useGetPayrollCalculationDate from '../../../../../../hooks/useGetPayrollCalculationDate';
import useUpdatePayrollCalculationDate from '../../../../../../hooks/useUpdatePayrollCalculationDate';

import styles from './styles.module.css';

function PayrollSettings({ handleSetup = () => {} }) {
	const {
		control,
		setValue,
		handleSubmit,
	} = useForm();

	const { data } = useGetPayrollCalculationDate();
	const { updatePayrollCalculationDate } = useUpdatePayrollCalculationDate();
	const onSubmit = (values) => {
		const payload = values.payroll_date;
		updatePayrollCalculationDate({ payload });
	};

	const STATUSOPTIONS = [
		{ label: 'Enabled', value: 'enabled' }, { label: 'Disabled', value: 'disabled' }];

	useEffect(() => {
		setValue('payroll_status', 'enabled');
		setValue('payroll_date', data);
		setValue('run_payroll_status', 'enabled');
		setValue('advance_salaries_status', 'disabled');
	}, [data, setValue]);

	return (
		<div className={styles.container}>

			<div
				className={styles.header}
				aria-hidden
			>
				<div
					className={styles.arrow_back}
					aria-hidden
					onClick={() => handleSetup('')}
				>
					<IcMArrowBack width={20} height={20} />
				</div>
				Payroll Settings
			</div>

			<div className={styles.form_content} style={{ display: 'none' }}>
				<div className={styles.heading}>
					<div className={styles.upper_heading}>Payroll Name</div>
					<div className={styles.lower_heading}>
						Please give a unique name
					</div>
				</div>
				<InputController control={control} name="payroll_settings" />
			</div>

			<div className={styles.form_content}>
				<div className={styles.heading}>
					<div className={styles.upper_heading}>Payroll Status</div>
					<div className={styles.lower_heading}>
						Enable or disable the payroll
					</div>
				</div>
				<SelectController control={control} name="payroll_status" options={STATUSOPTIONS} disabled />
			</div>

			<div className={styles.form_content}>
				<div className={styles.heading}>
					<div className={styles.upper_heading}>Payroll Date</div>
					<div className={styles.lower_heading}>
						Select a date after the 15th to pay your employees for the same month eg.
						if you pick 31, then your employees will get paid for January on 31st January.
					</div>
				</div>
				<InputController control={control} name="payroll_date" />
			</div>

			<div className={styles.form_content}>
				<div className={styles.heading}>
					<div className={styles.upper_heading}>Automatically Run Payroll</div>
					<div className={styles.lower_heading}>
						You can choose to either manually request execution each month before
						the payroll is executed,
						or CogoPayroll can automatically execute your payroll on your chosen date.
					</div>
				</div>
				<SelectController control={control} name="run_payroll_status" options={STATUSOPTIONS} disabled />
			</div>

			<div className={styles.form_content}>
				<div className={styles.heading}>
					<div className={styles.upper_heading}>Advance Salaries</div>
					<div className={styles.lower_heading}>
						Employees can request salary advances through CogoPayroll. If approved, the advance amount
						will be paid immediately and automatically recovered from future payments to the employees.
					</div>
				</div>
				<SelectController
					control={control}
					name="advance_salaries_status"
					options={STATUSOPTIONS}
					disabled
				/>
			</div>
			<div className={styles.btn}><Button onClick={handleSubmit(onSubmit)}>Submit</Button></div>
		</div>
	);
}

export default PayrollSettings;
