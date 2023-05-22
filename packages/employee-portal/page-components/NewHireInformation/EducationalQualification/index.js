import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import FieldArray from '../../../commons/FieldArray';

import controls from './controls';
import styles from './styles.module.css';

function EducationalQualification() {
	const { handleSubmit, control } = useForm();

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
						handleSubmit()
					}
			>
				Save
			</Button>
		</div>
	);
}

export default EducationalQualification;
