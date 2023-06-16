import { getFieldController } from './form-helpers';
import styles from './styles.module.css';

function Form({ control, controls, errors }) {
	return (
		<div className={styles.container}>
			{controls.map((eachControl) => {
				const Element = getFieldController(eachControl.controlType);
				if (!Element) return null;
				return (
					<div className={styles.each_element} key={eachControl.name}>
						<label className={styles.label_styles}>{eachControl?.label}</label>
						<Element control={control} {...eachControl} />
						<text className={styles.error_text}>
							{errors?.[eachControl.name] && (errors[eachControl.name]?.message || 'This is Required') }
						</text>
					</div>
				);
			})}
		</div>
	);
}
export default Form;
