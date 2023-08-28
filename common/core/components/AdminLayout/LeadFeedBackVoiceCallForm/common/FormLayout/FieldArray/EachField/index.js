/* eslint-disable import/no-cycle */
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../utils/getFieldController';

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
	customDelete = false,
}) {
	const onRemove = () => {
		remove(index, REMOVE_FIELDS_COUNT);
	};

	return (
		<div className={styles.wrapper}>
			{!customDelete ? (
				<div className={styles.delete_icon_container}>
					<IcMDelete height="20px" width="20px" onClick={onRemove} cursor="pointer" />
				</div>
			) : null}
			{controls.map((eachControl) => {
				const { controlType, name, width = '100%', Component, ...rest } = eachControl;

				const EleController = getFieldController({ controlType, Component }) || null;

				if (!EleController) {
					return null;
				}

				return (
					<div className={styles.container} key={`${parentName}.${index}.${name}`} style={{ width }}>
						<EleController
							{...rest}
							name={`${parentName}.${index}.${name}`}
							value={field?.[eachControl?.name]}
							control={control}
							onRemove={onRemove}
						/>
						{controlType !== 'withControl' ? (
							<div className={styles.error_text}>
								{error?.[eachControl.name]
								&& (error?.[eachControl.name]?.message || 'This is Required')}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}
export default EachField;
