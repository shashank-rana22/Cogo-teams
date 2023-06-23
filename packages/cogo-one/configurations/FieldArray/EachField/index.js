import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../utils/getFieldController';
import styles from '../styles.module.css';

function EachField({
	field, controls, parentName, index, control, error, remove, showButton = false,
}) {
	return (
		<>
			{controls.map((eachControl) => {
				const { controlType, name } = eachControl;
				const EleController = getFieldController(controlType) || null;
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
							showButton={showButton}
						/>
					</div>
				);
			})}

			{showButton && (
				<ButtonIcon
					size="xl"
					icon={<IcMDelete width={5} height={5} />}
					onClick={() => remove(index)}
				/>
			)}

		</>
	);
}
export default EachField;
