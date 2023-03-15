import { useForm } from '@cogoport/forms';

import getElementController from '../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest() {
	const { control, formState:{ errors } } = useForm();

	const controls = getControls();

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name, use = [] } = controlItem || {};

				const Element = getElementController(type);
				if (name === 'select_entity_usergroups') {
					return (
						<div className={styles.control_container}>
							<div className={`${styles.label} ${styles.label_type}`}>
								{label}
							</div>
							<div className={styles.control_type}>

								{use.map((inp) => (
									<div>
										<Element control={control} {...inp} />
										{errors[name] && <div className={styles.error_msg}>This is required</div>}
									</div>
								))}
							</div>

						</div>
					);
				}
				return (
					<div className={styles.control_container}>
						<div className={styles.label}>
							{label}
						</div>

						<div className={styles.control}>
							<Element control={control} {...controlItem} />
							{errors[name] && <div className={styles.error_msg}>This is required</div>}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CreateNewTest;
