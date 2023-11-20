import { Input, RadioGroup } from '@cogoport/components';
import { useEffect } from 'react';

import useGetSalaryStructure from '../../../hooks/useGetSalaryStructure';
import IncentivesComponent from '../IncentivesComponent';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const TOFIXED_NUMBER = 2;

const OPTIONS = [
	{ value: 'yes', label: 'Yes' },
	{ value: 'no', label: 'No' },
];

function ModalComponent({
	ctcStructure,
	initialQuestion,
	setCtcStructure = () => {},
	setInitialQuestion,
	control,
	error,
	setError = () => {},
	formProps,
	shareOfferLetter,
	offerLetterError,
	setShareOfferLetter,
	setOfferLetterError,
}) {
	const { salaryData, debounceQuery } = useGetSalaryStructure();
	// Do not delete
	console.log(typeof initialQuestion, 'ctcStruct');

	// const [salaryConfig, setSalaryConfig] = useState('');
	// const callApi = useCallback(async (values = {}) => {
	//  if (values?.initialQuestion && values?.salaryConfig !== '') {
	//      const payload = {
	//          base_ctc                : parseInt(values?.initialQuestion, 10),
	//          salary_configuration_id : values?.salaryConfig,
	//      };
	//      await getSalaryStructure(payload);
	//  }
	// }, [getSalaryStructure]);

	useEffect(() => {
		setCtcStructure(salaryData);
	}, [salaryData, setCtcStructure]);

	useEffect(() => {
		setOfferLetterError(false);
	}, [setOfferLetterError, shareOfferLetter]);
	return (
		<div>
			<div className={styles.text_container}>
				Share offer letter?
				<RadioGroup
					options={OPTIONS}
					onChange={setShareOfferLetter}
					value={shareOfferLetter}
				/>
				{offerLetterError ? <div className={styles.error}>*required</div> : null}
			</div>

			<div className={styles.header_field}>
				<div className={styles.control_label}>
					Input Target Annual Gross Salary (Fixed component)
				</div>
				<div className={styles.field_heading}>
					<Input
						placeholder="Set Offered CTC"
						value={initialQuestion}
						onChange={(e) => {
							setInitialQuestion(e);
							if (e) setError(false); else setError(true);
							debounceQuery(e);
						}}
						type="number"
						name="offered_ctc_input"
						className={styles.field}
					/>
					{error ? <div className={styles.error}>*required</div> : null}
				</div>
			</div>

			{/* do not delete commented code required in future. */}

			{/* <div className={styles.salary_config_cont}>
                <div className={styles.control_label}>
                    Salary Config
                </div>
                <div className={styles.field_heading}>
                    <AsyncSelectController
                        name="salaryConfig"
                        asyncKey="list_salary_configurations"
                        initialCall
                        control={control}
                        onChange={(e) => {
                            setSalaryConfig(e);
                        //  callApi({ initialQuestion, salaryConfig: e });
                        }}
                        placeholder="Select Salary Configuration"
                        className={styles.field}
                    />
                    {error.salaryConfig ? <div className={styles.error}>Required field</div> : null}
                </div>
            </div> */
            }
			<div className={styles.table_container}>
				{ctcStructure?.basic?.yearlyValue !== 0 && initialQuestion !== ''
					? (
						<>
							<div className={styles.heading}>
								<h4 style={{ width: '60%' }}>Components</h4>
								<h4 style={{ width: '20%' }}>Annual Salary</h4>
								<h4 style={{ width: '20%' }}>Monthly Salary</h4>
							</div>
							{Object.entries(ctcStructure).map(([key, value]) => {
								const { heading, yearlyValue, monthlyValue } = value;
								return (
									<div className={styles.list} key={key}>
										<div style={{ width: '60%' }}>{heading ?? '___'}</div>
										<div style={{ width: '20%' }}>
											{Number(yearlyValue || DEFAULT_VALUE).toFixed(TOFIXED_NUMBER) ?? '___'}
										</div>
										<div style={{ width: '20%' }}>
											{(Number(monthlyValue || DEFAULT_VALUE).toFixed(TOFIXED_NUMBER)) ?? '___'}
										</div>
									</div>
								);
							})}
						</>
					)
					: null}

			</div>
			<IncentivesComponent control={control} error={error} formProps={formProps} />
		</div>
	);
}

export default ModalComponent;
