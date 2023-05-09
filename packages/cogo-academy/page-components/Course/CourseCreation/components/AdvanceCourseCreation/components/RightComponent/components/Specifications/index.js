import { useForm } from '@cogoport/forms';

import FieldArray from '../../../../../../../commons/FieldArray';
import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function Specifications() {
	const { control, formState:{ errors = {} } } = useForm();

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name } = controlItem || {};

				if (type === 'fieldArray') {
					return (
						<div key={name} className={styles.form_group}>
							<div className={styles.label}>{label}</div>

							<FieldArray
								{...controlItem}
								control={control}
								error={errors?.[name]}
							/>
						</div>
					);
				}

				const Element = getFieldController(type);

				if (!Element) return null;

				return (
					<div key={name} className={styles.form_group}>
						<div className={styles.label}>{label}</div>

						<div className={styles.input_group}>
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

export default Specifications;
