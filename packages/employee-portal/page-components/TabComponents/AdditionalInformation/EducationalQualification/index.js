import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import FieldArray from '../../../../commons/FieldArray';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

function EducationalQualification({ getEmployeeDetails, data }) {
	const { handleSubmit, control, setValue } = useForm();

	const { detail } = data || {};

	const { id, employee_education_details } = detail || {};

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: 'educational_qualification' });
	};

	useEffect(() => {
		setValue('education_qualifications', employee_education_details.map((item) => ({
			...item,
			started_at : new Date(item?.started_at),
			ended_at   : new Date(item?.ended_at),
		})));
	}, [employee_education_details, setValue]);

	return (
		<div className={styles.whole_container}>

			<div className={styles.introductory_text}>
				Tell us about your educational history, starting with your highest level of education and including any
				ongoing studies.
			</div>

			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, name: controlName } = controlItem || {};
					if (type === 'fieldArray') {
						return (
							<FieldArray
								Array
								name="education_qualifications"
								control={control}
								controls={controlItem?.controls}
								key={controlName}
							/>

						);
					}
					return (
						<div key={controlItem}>
							EducationalQualification
						</div>
					);
				})}
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

		</div>
	);
}

export default EducationalQualification;
