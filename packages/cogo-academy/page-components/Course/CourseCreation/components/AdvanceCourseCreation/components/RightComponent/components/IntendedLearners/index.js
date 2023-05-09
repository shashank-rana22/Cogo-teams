import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import ExcelComponent from './ExcelComponent';
import styles from './styles.module.css';

function IntendedLearners() {
	const { control, formState:{ errors = {} } } = useForm();

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name } = controlItem || {};

				const Element = getFieldController(type);

				if (!Element) return null;

				if (name === 'upload_excel') {
					return (
						<ExcelComponent
							Element={Element}
							name={name}
							label={label}
							controlItem={controlItem}
							control={control}
							errors={errors}
						/>
					);
				}

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>{label}</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						<div className={styles.error_message}>
							{errors?.[name]?.message}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default IntendedLearners;
