import { getFieldController } from '../../../../../../utils/getFieldController';

import styles from './styles.module.css';

function Form({
	control, controls, errors,
	showElements,
}) {
	return (
		<div className={styles.container}>
			{controls.map((eachControl) => {
				const { controlType, name, label } = eachControl || {};
				const Element = getFieldController(controlType);

				const show = !(name in showElements) || showElements[name];

				if (!Element || !show) {
					return null;
				}

				return (
					<div className={styles.each_element} key={name}>
						<label className={styles.label_styles}>{label}</label>
						<Element control={control} {...eachControl} error={errors?.[name]} />
						<text className={styles.error_text}>
							{controlType !== 'fieldArray'
							&& (errors?.[name] && (errors[name]?.message || 'This is Required'))}
						</text>
					</div>
				);
			})}
		</div>
	);
}
export default Form;
