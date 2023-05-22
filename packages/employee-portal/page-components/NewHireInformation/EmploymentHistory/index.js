import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getElementController from '../../../configs/getElementController';

import controls from './controls';
import styles from './styles.module.css';

function EmploymentHistory() {
	const { handleSubmit, control, formState: { errors } } = useForm();

	return (
		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, label, name: controlName } = controlItem || {};
					const Element = getElementController(type);

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element
									control={control}
									{...controlItem}
									className={styles[`element_${controlName}`]}
								/>

								{errors[controlName]?.message
									? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
							</div>
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

export default EmploymentHistory;
