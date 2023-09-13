/* eslint-disable import/no-cycle */
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

const REMOVE_FIELDS_COUNT = 1;

function EachField({
	field = {},
	controls = [],
	parentName = '',
	index = 0,
	control = {},
	error = {},
	remove = () => {},
	noDeleteButtonTill = 0,
	customDelete = false,
	style = {},
}) {
	const onRemove = () => {
		remove(index, REMOVE_FIELDS_COUNT);
	};

	return (
		<div className={styles.outer_container} style={style}>
			{(!customDelete && (index >= noDeleteButtonTill)) ? (
				<div className={styles.delete_icon_container}>
					<IcMDelete height="20px" width="20px" onClick={onRemove} cursor="pointer" />
				</div>
			) : null}
			{controls.map((eachControl) => {
				const { controlType, name, width = '50%', customStyles, label = '' } = eachControl;

				const EleController = getFieldController(controlType) || null;

				if (!EleController) {
					return null;
				}

				return (
					<div
						className={styles.container}
						key={`${parentName}.${index}.${name}`}
						style={{ width }}
					>
						<label className={styles.label_styles}>{label}</label>
						<EleController
							{...eachControl}
							name={`${parentName}.${index}.${name}`}
							value={field?.[eachControl?.name]}
							control={control}
							style={customStyles}
						/>
						<div className={styles.error_text}>
							{error?.[eachControl.name] && (error?.[eachControl.name]?.message || 'This is Required')}
						</div>
					</div>
				);
			})}

		</div>
	);
}
export default EachField;
