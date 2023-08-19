/* eslint-disable import/no-cycle */
import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

const REMOVE_FIELDS_COUNT = 1;

const ADD_ONE_TO_ZERO_INDEXING = 1;

function EachField({
	field = {},
	controls = [],
	parentName = '',
	index = 0,
	control = {},
	error = {},
	remove = () => {},
	fieldArrayTitle = '',
	titleReqWithCount = false,
}) {
	const onRemove = () => {
		remove(index, REMOVE_FIELDS_COUNT);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.delete_icon_container}>
				<IcMDelete height="25px" width="25px" onClick={onRemove} cursor="pointer" />
			</div>
			<fieldset className={styles.outer_container}>
				<legend className={styles.legend_styles}>
					{fieldArrayTitle}
					{titleReqWithCount ? (
						<span>
							-
							{index + ADD_ONE_TO_ZERO_INDEXING}
						</span>
					) : null}
				</legend>
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
								key={field?.id}
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
			</fieldset>
		</div>
	);
}
export default EachField;
