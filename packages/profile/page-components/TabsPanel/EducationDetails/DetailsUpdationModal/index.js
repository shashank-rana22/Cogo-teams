import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetailsAdmin';
import getElementController from '../../../../utils/configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function EducationalQualification({ getEmployeeDetails, data }) {
	const { handleSubmit, control, watch, formState: { errors } } = useForm();

	const controls = getControls();

	const { employee_detail } = data || {};

	const { id } = employee_detail || {};
	const country_id = GLOBAL_CONSTANTS?.country_ids?.IN;

	const countrySpecificOptions = getCountryConstants({ country_id });

	const { options } = countrySpecificOptions || {};
	const { education_level:educationLevelOptions, disable_options } = options || {};

	const { education_level } = watch() || {};
	const TO_ADD = true;
	const { loading, updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails, TO_ADD });

	const onSubmit = (values) => {
		updateEmployeeDetails(values);
	};

	return (
		<div className={styles.whole_container}>

			<div className={styles.introductory_text}>
				Update about employee educational history, starting with your highest level of education
				and including any ongoing studies.
			</div>

			<div className={styles.container}>
				{controls.map((controlItem) => {
					const Element = getElementController(controlItem.type);

					if (!Element) return null;

					return (
						<div key={controlItem.name} className={styles.control_container}>
							<div className={styles.label}>
								{controlItem.label}
							</div>

							<div className={styles.control}>
								<Element
									control={control}
									{...controlItem}
									options={controlItem?.name === 'degree'
										? educationLevelOptions?.[education_level] : controlItem?.options}
									disabled={
										!!(controlItem?.name === 'degree' && disable_options.includes(education_level))
}
								/>

								<div className={styles.error_message}>
									{errors?.[controlItem?.name]?.message}
								</div>
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
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</Button>
			</div>

		</div>
	);
}

export default EducationalQualification;
