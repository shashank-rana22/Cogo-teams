import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FieldArray from '../../../../commons/FieldArray';
import useCreateEmployeeDetails from '../../../../hooks/useCreateEmployeeDetails';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

function EducationalQualification() {
	const { handleSubmit, control } = useForm();

	const { createEmployeeDetails } = useCreateEmployeeDetails();

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const onSubmit = (values) => {
		createEmployeeDetails({ data: values, id });
	};

	return (
		<div className={styles.whole_container}>
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

export default EducationalQualification;
