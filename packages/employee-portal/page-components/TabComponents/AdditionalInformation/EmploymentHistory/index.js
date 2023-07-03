import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect, useState } from 'react';

import FieldArray from '../../../../commons/FieldArray';
import getElementController from '../../../../configs/getElementController';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import { extraDocsControls } from './extraDocsControls';
import styles from './styles.module.css';

const FORM_TYPE_EMPLOYMENT_HISTORY = 'employment_history';
const CONTROL_TYPE_FIELD_ARRAY = 'fieldArray';

const WATCH_SALARY_SLIP = 'salary_slip';
const WATCH_OFFER_LETTER = 'offer_letter';

function EmploymentHistory({ getEmployeeDetails, data }) {
	const [isChecked, setIsChecked] = useState(false);

	const { handleSubmit, control, setValue, formState: { errors }, watch } = useForm();

	const { detail } = data || {};

	const { id, employee_experience_details } = detail || {};

	const paySlip = watch(WATCH_SALARY_SLIP);
	const offerLetter = watch(WATCH_OFFER_LETTER);

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({
		id,
		getEmployeeDetails,
		offerLetter,
		paySlip,
	});

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: FORM_TYPE_EMPLOYMENT_HISTORY });
	};

	const removeTypeField = (controlItem) => {
		const { type, ...rest } = controlItem;
		return rest;
	};

	useEffect(() => {
		setValue(FORM_TYPE_EMPLOYMENT_HISTORY, employee_experience_details?.map((item) => ({
			...item,
			started_at : new Date(item.started_at),
			ended_at   : new Date(item.ended_at),
		})));
	}, [employee_experience_details, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.check}>
				<Checkbox
					onChange={() => setIsChecked((pv) => !pv)}
					checked={isChecked}
				/>
				I have prior work experience
			</div>
			{isChecked ? (
				<>
					<div className={styles.container}>
						<div className={styles.introductory_text}>
							Tell us about your work experience, starting with the most recent.
						</div>

						{controls?.map((controlItem) => {
							const { type, name: controlName } = controlItem || {};

							if (type === CONTROL_TYPE_FIELD_ARRAY) {
								return (
									<FieldArray
										Array
										name={FORM_TYPE_EMPLOYMENT_HISTORY}
										control={control}
										controls={controlItem?.controls}
										key={controlName}
									/>
								);
							}
							return (
								<div key={controlItem}>
									EmploymentHistory
								</div>
							);
						})}

						<div className={styles.upload_row}>

							{extraDocsControls.map((controlItem) => {
								const el = { ...controlItem };
								const Element = getElementController(el.type);
								if (!Element) return null;
								return (
									<div key={el.name} style={el.style} className={styles.section_container}>
										<span className={styles.control_label}>{el.label}</span>

										<Element
											{...(el.type === 'fileUpload'
												? removeTypeField(controlItem) : { ...controlItem })}
											size="md"
											key={el.name}
											control={control}
											id={`${el.name}_input`}
											className={styles.field_controller}
										/>

										<div className={styles.error_message}>
											{errors?.[el.name]?.message}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					<div className={styles.button}>
						<Button
							size="md"
							type="button"
							loading={loading}
							onClick={handleSubmit(onSubmit)}
						>
							Save
						</Button>
					</div>
				</>
			) : null}
		</div>
	);
}

export default EmploymentHistory;
