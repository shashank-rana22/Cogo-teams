import { Button, cl, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack, IcMInformation } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetCreateIrregularPayments from '../../hooks/useGetCreateIrregularPayments';
import useGetCreateTemporaryIrregularPayments from '../../hooks/useGetCreateTemporaryIrregularPayments';
import useGetMonthCycle from '../../hooks/useGetMonthCycle';

import AddPayment from './AddPayment';
import BulkPayment from './BulkPayment';
import ConfirmVerify from './ConfirmVerify';
import styles from './styles.module.css';

const INITIAL_PAGE = 0;
const MID_PAGE = 1;
const FINAL_PAGE = 2;
const OK = 200;

function IrregularPayments({ handleSetup = () => {} }) {
	const router = useRouter();
	const { data: cycleMonth } = useGetMonthCycle();

	const [step, setStep] = useState(INITIAL_PAGE);
	const [parentStep, setParentStep] = useState(undefined);

	const [fileErrors, setFileErrors] = useState(null);

	const { control, formState : { errors }, watch, setValue, handleSubmit, clearErrors, reset } = useForm();
	const { getCreateTempIrregularPayments } = useGetCreateTemporaryIrregularPayments();

	const onSubmit = async (values) => {
		const calcuateStartDate = (month) => {
			const currentDate = new Date();
			if (month) {
				return new Date(currentDate.getFullYear(), month, GLOBAL_CONSTANTS.one);
			}
			return new Date(currentDate.getFullYear(), currentDate.getMonth(), GLOBAL_CONSTANTS.one);
		};

		const fromDate = calcuateStartDate(values.start_month);
		const interval = (values.month_count && parseInt(values.month_count, 10) !== GLOBAL_CONSTANTS.one)
			? values.month_count : GLOBAL_CONSTANTS.zeroth_index;

		const promise = await getCreateTempIrregularPayments(
			values.employees,
			parseInt(values.amount, 10),
			values.payment_type,
			values.description,
			values.taxation,
			fromDate,
			parseInt(interval, 10),
		);

		if (promise.status === OK) {
			setParentStep(step);
			setStep(FINAL_PAGE);
		}
	};

	const { getCreateIrregularPayments } = useGetCreateIrregularPayments();

	const stepper = [
		{
			Component: <AddPayment
				setStep={setStep}
				control={control}
				errors={errors}
				watch={watch}
				setValue={setValue}
				clearErrors={clearErrors}
			/>,
			buttons: 'one',
		},
		{
			Component: <BulkPayment
				control={control}
				watch={watch}
				setFileErrors={setFileErrors}
			/>,
			buttons: 'two',
		},
		{
			Component : <ConfirmVerify />,
			buttons   : 'three',
		},
	];

	const file = watch('upload');
	const buttonsText = {
		one: {
			handleBack: () => {
				router.push('/payroll/manage');
			},
			handleNext : handleSubmit(onSubmit),
			first      : 'cancel',
			next       : 'proceed',
		},
		two: {
			handleBack : () => setStep(INITIAL_PAGE),
			handleNext : () => {
				if (file) {
					if (typeof fileErrors === 'number' && fileErrors === GLOBAL_CONSTANTS.zeroth_index) {
						setParentStep(step);
						setStep(FINAL_PAGE);
						reset();
					} else {
						Toast.error('Kindly fix errors in csv file!');
					}
				} else {
					Toast.error('Upload the csv!');
				}
			},
			first : 'back',
			next  : 'proceed',
		},
		three: {
			handleBack: () => {
				setStep(parentStep);
			},
			handleNext: () => {
				getCreateIrregularPayments();
				router.push('/payroll/manage');
			},
			first : 'cancel',
			next  : 'add to next payroll',
		},
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>
				<div className={styles.flex}>
					<div
						className={styles.row}
					>
						<div
							aria-hidden
							onClick={() => {
								if (step === INITIAL_PAGE) {
									handleSetup('');
								} else if (step === MID_PAGE) {
									setStep(INITIAL_PAGE);
								} else {
									setStep(parentStep);
								}
							}}
							style={{ cursor: 'pointer', height: '100%' }}
						>
							<IcMArrowBack
								width={20}
								height={20}
							/>
						</div>
						<div className={styles.top_text_container}>
							<span className={styles.top_bold_text}>IRREGULAR PAYMENTS</span>
							<span className={styles.top_grey_text}>Pay employees quickly</span>
						</div>
					</div>
					<div className={styles.top_next_container}>
						<span className={styles.top_bold_text}>{cycleMonth}</span>
						<span className={styles.top_grey_text}>Next Payroll Cycle</span>
					</div>
				</div>
				<div className={styles.horizontal_container}>
					{stepper[step].Component}
					{
						step !== FINAL_PAGE ? (
							<div className={styles.side_container}>
								<div className={styles.note}>
									<IcMInformation width={16} height={16} />
									<span className={styles.side_heading}>Note</span>
								</div>
								<p className={styles.paragraph}>
									Pay your employees instantly outside their regular payroll cycle using
									our new one-time payments feature.
									Please note that this is not a substitute
									for executing payroll, salary advance, or reimbursements.
									A one-time payment helps in immediately paying
									a bonus, incentive etc to your employees, which gets added
									to their next payroll&apos;s earnings.
								</p>
							</div>
						) : null
					}
				</div>
				<div className={cl`${styles.bottom_container} ${step === FINAL_PAGE ? styles.align_end : null}`}>
					<Button size="md" themeType="secondary" onClick={buttonsText[stepper[step].buttons].handleBack}>
						{buttonsText[stepper[step].buttons].first}
					</Button>
					<Button size="md" themeType="primary" onClick={buttonsText[stepper[step].buttons].handleNext}>
						{buttonsText[stepper[step].buttons].next}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default IrregularPayments;
