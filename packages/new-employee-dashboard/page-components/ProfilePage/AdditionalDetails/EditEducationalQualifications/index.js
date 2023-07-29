import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import FieldArray from '../../../commons/FieldArray';
import useUpdateEmployeeDetails from '../../../hooks/useUpdateEmployeeDetailsAdmin';

import getControls from './controls';
import styles from './styles.module.css';

const FORM_TYPE_EDUCATIONAL_QUALIFICATION = 'educational_qualification';
const CONTROL_TYPE_FIELD_ARRAY = 'fieldArray';

function EducationalQualification({ getEmployeeDetails, data }) {
	const { handleSubmit, control, setValue, watch, formState: { errors } } = useForm();
	const watchValues = watch();

	const controls = getControls();

	const { detail } = data || {};

	const { id, employee_education_details } = detail || {};

	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: FORM_TYPE_EDUCATIONAL_QUALIFICATION });
	};

	useEffect(() => {
		setValue(FORM_TYPE_EDUCATIONAL_QUALIFICATION, employee_education_details?.map((item) => ({
			...item,
			degree_proof : item?.degree_proof,
			started_at   : new Date(item?.started_at),
			ended_at     : new Date(item?.ended_at),
		})));
	}, [employee_education_details, setValue]);

	return (
		<div className={styles.whole_container}>

			<div className={styles.introductory_text}>
				Update about employee educational history, starting with your highest level of education
				and including any ongoing studies.
			</div>

			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, name: controlName } = controlItem || {};
					if (type === CONTROL_TYPE_FIELD_ARRAY) {
						return (
							<FieldArray
								{...controlItem}
								name={FORM_TYPE_EDUCATIONAL_QUALIFICATION}
								control={control}
								controls={controlItem?.controls}
								key={controlName}
								watch={watchValues?.educational_qualification}
								error={errors?.educational_qualification}
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
