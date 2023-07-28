import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function Form({
	control = {}, controls = [], errors = {},
}) {
	return (
		<div className={styles.container}>
			{controls.map((eachControl) => {
				const { controlType, name, label } = eachControl || {};
				const Element = getFieldController(controlType);

				if (!Element) {
					return null;
				}

				return (
					<div className={styles.each_element} key={name}>
						<div className={styles.label_styles}>{label}</div>
						<Element control={control} {...eachControl} error={errors?.[name]} />
						<div className={styles.error_text}>
							{(errors?.[name] && (errors[name]?.message || 'This is Required'))}
						</div>
					</div>
				);
			})}
		</div>
	);
}
export default Form;
