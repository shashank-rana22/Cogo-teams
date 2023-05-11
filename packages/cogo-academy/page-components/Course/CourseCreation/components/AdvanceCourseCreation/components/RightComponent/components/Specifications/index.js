import FieldArray from '../../../../../../../commons/FieldArray';
import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function Specifications({
	control,
	watch,
	handleSubmit,
	errors,
}) {
	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name, rules } = controlItem || {};

				if (type === 'fieldArray') {
					return (
						<div key={name} className={styles.form_group}>
							<div className={styles.label}>
								{label}
								{rules ? <sup className={styles.superscipt}>*</sup> : null}
							</div>

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
						<div className={styles.label}>
							{label}
							{rules ? <sup className={styles.superscipt}>*</sup> : null}
						</div>

						<div className={styles.input_group}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default Specifications;
