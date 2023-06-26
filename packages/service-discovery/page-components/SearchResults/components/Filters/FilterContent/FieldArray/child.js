import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../../../configs/getElementController';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
	error = {},
	length = 0,
	watch,
}) {
	// const fieldArrayValues = watch(name) || [];
	return (
		<div className={styles.form_container}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const {
						type,
						name: controlName,
						options = [],
						optionsListKey = '',
						commodityType = '',
						span,
						subLabel = '',
						controls: innerControls,
					} = controlItem;

					// const finalOptions = [];

					// if (optionsListKey || options) {
					// 	const containerType = fieldArrayValues?.[index]?.container_type;

					// 	const keyOptions = getOptions(options, optionsListKey, {
					// 		commodityType,
					// 		containerType,
					// 	});

					// 	const keyOptions = [];

					// 	finalOptions = isEmpty(options) ? keyOptions?.finalOptions : options;
					// }

					const flex = (span || 12) / 12 * 100;

					if (innerControls) {
						return (
							<div key={name} className={styles.form_item} style={{ width: `${flex}%` }}>
								<div className={styles.heading}>{controlItem.label || lowerlabel}</div>

								<div className={styles.content}>
									{innerControls.map((innerControlItem) => {
										const {
											type: innerType,
											name: innerControlName,
											span: innerSpan,
										} = innerControlItem;

										const innerFlex = (innerSpan || 12) / 12 * 100;
										const Element = getElementController(innerType);

										return (
											<div
												className={styles.form_item}
												style={{ width: `${innerFlex}%`, marginBottom: 0 }}
												key={`${innerControlName}_${index}`}
											>
												{(showLabelOnce && index === 0 && innerControlItem.label)
											|| (!showLabelOnce && innerControlItem.label) ? (
												<div className={styles.heading}>
													{innerControlItem.label || lowerlabel}
												</div>
													) : null}

												<Element
													width="100%"
													key={`create_form_${innerControlItem.name}_${index}`}
													itemKey={`create_form_${innerControlItem.name}_${index}`}
													control={control}
													id={`create_form_${innerControlItem.name}_${index}`}
													{...innerControlItem}
													disabled={disabled}
													name={`${name}[${index}].${innerControlItem.name}`}
												/>

												<div className={styles.error_message}>
													{error?.[innerControlName]?.message || error?.[innerControlName]?.type}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					}

					const Element = getElementController(type);

					return (
						<div
							className={styles.form_item}
							style={{ width: `${flex}%` }}
							key={`create_form_${controlItem.name}_${index}`}
						>
							{(showLabelOnce && index === 0 && controlItem.label)
							|| (!showLabelOnce && controlItem.label) ? (
								<div className={styles.heading}>{controlItem.label || lowerlabel}</div>
								) : null}

							<Element
								width="100%"
								key={`create_form_${controlItem.name}_${index}`}
								itemKey={`create_form_${controlItem.name}_${index}`}
								control={control}
								id={`create_form_${controlItem.name}_${index}`}
								{...controlItem}
								disabled={disabled}
								name={`${name}[${index}].${controlItem.name}`}
								// options={finalOptions}
							/>
							{subLabel ? (
								<div className={styles.sub_label}>{subLabel}</div>
							) : null}
							<div className={styles.error_message}>
								{error?.[controlName]?.message || error?.[controlName]?.type}
							</div>
						</div>
					);
				})}

			</div>

			{length >= 2 && !disabled ? (
				<IcMDelete
					className={styles.remove_icon}
					onClick={() => remove(index, 1)}
				/>
			) : null}
		</div>
	);
}
export default Child;
