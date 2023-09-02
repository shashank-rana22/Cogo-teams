import { getFieldController } from '../../utils/getFieldController';

import styles from './styles.module.css';

function Form({
	control = {},
	controls = [],
	errors = {},
	showElements = {},
}) {
	return (
		<div className={styles.container}>
			{controls?.map((eachControl) => {
				const { controlType, name, label, width = '100%' } = eachControl || {};
				const Element = getFieldController({ controlType });

				const show = !(name in showElements) || showElements[name];

				if (!Element || !show) {
					return null;
				}

				return (
					<div
						className={styles.each_element}
						key={name}
						style={{ width }}
					>
						<label className={styles.label_styles}>
							{label}
							{!!eachControl?.rules?.required && <span className={styles.asterisk}>*</span>}
						</label>
						<Element
							key={name}
							control={control}
							{...eachControl}
							error={errors?.[name]}
						/>
						<div className={styles.error_text}>
							{controlType !== 'fieldArray'
							&& (errors?.[name] && (errors[name]?.message || 'This is Required'))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default Form;
