import { getFieldArrayControllers } from '../../../utils/getFieldArrayControllers';
import styles from '../styles.module.css';

function EachField({
	field, controls, parentName, index, control, error,
}) {
	return (
		controls.map((eachControl) => {
			const { controlType, name } = eachControl;

			const EleController = getFieldArrayControllers(controlType) || null;

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
						error={error?.[eachControl.name]}
					/>
				</div>
			);
		})
	);
}
export default EachField;
