/* eslint-disable import/no-cycle */
import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

function EachField({
	field, controls, parentName, index, control, error,
}) {
	return (
		controls.map((eachControl) => {
			const { controlType, name, width = '50%', customStyles } = eachControl;

			const EleController = getFieldController(controlType) || null;

			if (!EleController) {
				return null;
			}

			return (
				<div
					className={styles.container}
					key={`${parentName}.${index}.${name}`}
					style={{ width, ...customStyles }}
				>
					<EleController
						{...eachControl}
						name={`${parentName}.${index}.${name}`}
						value={field?.[eachControl?.name]}
						control={control}
					/>
					<div className={styles.error_text}>
						{error?.[eachControl.name] && (error?.[eachControl.name]?.message || 'This is Required')}
					</div>
				</div>
			);
		})
	);
}
export default EachField;
