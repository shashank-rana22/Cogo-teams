import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getElementController } from '../getElementController';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	field,
	index,
	name,
	remove,
	error,
	showElements = {},
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	showLabelOnce,
	disabled = false,
	lowerlabel = '',
}) {
	return (
		<div
			className={styles.container_wrapper}
			key={field.id}
		>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const { watch, style, name: controlName, type } = controlItem;
					const show = !(controlItem.name in showElements) || showElements[controlItem.name];

					const Element = getElementController(type);

					const extraProps = {};
					if (controlItem.customProps) {
						Object.keys(controlItem.customProps).forEach((key) => {
							const newControlItem = controlItem;
							newControlItem[key] = controlItem.customProps[key][index];
						});
					} else if (controlItem.options) {
						if (Array.isArray(controlItem.options)) {
							extraProps.options = controlItem.options;
						} else {
							extraProps.options = controlItem.options[index];
						}
					}

					if (Array.isArray(controlItem.itemsDisabled)) {
						const newControlItem = controlItem;
						newControlItem.disabled = controlItem.itemsDisabled[index];
					}

					if (watch) {
						return show ? (
							<div
								className={styles.form_item}
								style={{ padding: '8px', ...style }}
							>
								<div className={styles.list}>
									{(showLabelOnce && index === 0 && controlItem.label)
							|| (!showLabelOnce && controlItem.label) ? (

								<div>{controlItem.label || lowerlabel}</div>

										) : null}

									<Element
										width="100%"
										key={`create_form_${controlItem.name}_${index}`}
										itemKey={`create_form_${controlItem.name}_${index}`}
										control={control}
										id={`create_form_${controlItem.name}_${index}`}
										{...controlItem}
										name={`${name}[${index}].${controlItem.name}`}
									/>

									<div className={styles.error_message}>
										{error?.[controlName]?.message || error?.[controlName]?.type}
									</div>
								</div>
							</div>
						) : null;
					}

					return show ? (
						<div
							className={styles.form_item}
							style={{ padding: '8px', ...style }}
						>
							<div className={styles.list}>
								{(showLabelOnce && index === 0 && controlItem.label)
							|| (!showLabelOnce && controlItem.label) ? (

								<div>{controlItem.label || lowerlabel}</div>

									) : null}

								<Element
									width="100%"
									key={`create_form_${controlItem.name}_${index}`}
									itemKey={`create_form_${controlItem.name}_${index}`}
									control={control}
									id={`create_form_${controlItem.name}_${index}`}
									{...controlItem}
									name={`${name}[${index}].${controlItem.name}`}
								/>

								<div className={styles.error_message}>
									{error?.[controlName]?.message || error?.[controlName]?.type}
								</div>
							</div>
						</div>
					) : null;
				})}

				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<div
						className={styles.align_remove}
					>
						<IcMDelete
							className={`form-fieldArray-${name}-remove`}
							onClick={() => remove(index, 1)}
							width="20px"
							height="20px"
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}
export default Child;
