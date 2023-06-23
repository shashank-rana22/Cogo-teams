import { getSpecifiedController } from '../../../utils/getSpecifiedController';
import styles from '../styles.module.css';

function EachField({
	field, controls, parentName, index, control, error,
}) {
	return (
		<>
			{controls.map((eachControl) => {
				const { controlType, name } = eachControl;
				const EleController = getSpecifiedController(controlType) || null;
				if (!EleController) {
					return null;
				}

				return (
					<div className={styles.container} key={`${name}.${index}.${eachControl?.name}`}>
						<EleController
							{...eachControl}
							name={`${parentName}.${index}.${name}`}
							value={field?.[eachControl?.name]}
							control={control}
							source="edit_line_items"
							label={eachControl?.label}
							error={error?.[eachControl.name]}
						/>
					</div>
				);
			})}

		</>
	);
}
export default EachField;
