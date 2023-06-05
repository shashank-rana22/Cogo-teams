import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import FieldArray from '../../../../commons/FieldArray';
import getElementController from '../../../../configs/getElementController';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import { extraDocsControls } from './extraDocsControls';
import styles from './styles.module.css';

function EmploymentHistory({ getEmployeeDetails, data: info }) {
	const { handleSubmit, control, setValue, formState: { errors } } = useForm();

	const id = info?.detail?.id;

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		// console.log('val', values);
		updateEmployeeDetails({ data: values, formType: 'employment_history' });
	};

	// useEffect((item) => {

	// })

	const removeTypeField = (controlItem) => {
		const { type, ...rest } = controlItem;
		return rest;
	};

	useEffect(() => {
		setValue('employment_history', info?.detail?.employee_experience_details.map((item) => ({
			...item,
			started_at : new Date(item.started_at),
			ended_at   : new Date(item.ended_at),
		})));
	}, [info, setValue]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.introductory_text}>
					Tell us about your work experience, starting with the most recent.
				</div>
				{controls?.map((controlItem) => {
					const { type, name: controlName } = controlItem || {};

					if (type === 'fieldArray') {
						return (
							<FieldArray
								Array
								name="employment_history"
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

					{/* {extraDocsControls.map((controlItem) => {
					// const { yearly, monthly } = controlItem;

						const Element = getElementController(controlItem?.type);

						console.log('control', controlItem);

						return (
							<div
								key={controlItem?.name}
								className={styles.upload_row}
							>
								<span className={styles.control_label}>{controlItem?.label}</span>
								<Element
									{...controlItem}
									size="lg"
									key={controlItem?.name}
									control={control}
									className={styles.field_controller}
								/>
							</div>

						// null
						);
					})} */}

					{extraDocsControls.map((controlItem) => {
						const el = { ...controlItem };
						const Element = getElementController(el.type);
						if (!Element) return null;
						return (
							<div key={el.name} style={el.style} className={styles.section_container}>
								<span className={styles.control_label}>{el.label}</span>

								<Element
									{...(el.type === 'fileUpload' ? removeTypeField(controlItem) : { ...controlItem })}
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

			<Button
				size="md"
				type="button"
				className={styles.button}
				loading={loading}
				onClick={handleSubmit(onSubmit)}
			>
				Save
			</Button>
		</>
	);
}

export default EmploymentHistory;
