/* eslint-disable import/no-cycle */
import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

function EachField({
	field, controls, parentName, index, control, error,
}) {
	return (
		controls.map((eachControl) => {
			const { controlType, name } = eachControl;

			const EleController = getFieldController(controlType) || null;

			if (!EleController) {
				return null;
			}

			return (
				<div className={styles.container} key={`${parentName}.${index}.${name}`}>
					<EleController
						{...eachControl}
						name={`${parentName}.${index}.${name}`}
						value={field?.[eachControl?.name]}
						control={control}
					/>
					<text className={styles.error_text}>
						{error?.[eachControl.name] && (error?.[eachControl.name]?.message || 'This is Required')}
					</text>
				</div>
			);
		})
	);
}
export default EachField;
