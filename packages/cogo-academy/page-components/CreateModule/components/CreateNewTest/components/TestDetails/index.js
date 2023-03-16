import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';

import getElementController from '../../../../../../configs/getElementController';

import getControls from './controls';
import styles from './styles.module.css';

function CreateNewTest() {
	const { control, formState:{ errors } } = useForm();

	const controls = getControls();

	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Test</div>
			</div>
			<div className={styles.container}>
				{controls.map((controlItem) => {
					const { type, label, name, use = [] } = controlItem || {};

					const Element = getElementController(type);
					if (name === 'select_entity_usergroups') {
						return (
							<div className={styles.control_container}>
								<div className={`${styles.label}`}>
									{label}
									<sup style={{ color: 'red' }}>*</sup>
								</div>
								<div className={styles.control_type}>

									{use.map((inp) => (
										<div className={styles.input_wrapper}>
											<Element
												control={control}
												{...inp}
												className={styles[`element_${inp.name}}`]}
											/>
											{errors[name] && <div className={styles.error_msg}>This is required</div>}
										</div>
									))}
								</div>

							</div>
						);
					}
					return (
						<div className={styles.control_container_two}>
							<div className={styles.label}>
								{label}
								<sup style={{ color: 'red' }}>*</sup>
							</div>

							<div className={styles.control}>
								<Element control={control} {...controlItem} className={styles[`element_${name}`]} />
								{errors[name] && <div className={styles.error_msg}>This is required</div>}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CreateNewTest;
