import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../../../../configs/getElementController';

import styles from './styles.module.css';

const getOptions = (key) => {
	let options = [];
	if (key === 'container-sizes') {
		options = containerSizes;
	} else if (key === 'container-types') {
		options = containerTypes;
	}

	return options;
};

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
	setValue,
}) {
	const fieldArrayValues = watch(name) || [];

	const CHANGE_MAPPING = {
		container_type: {
			onChange: () => {
				setValue(`container[${index}].commodity`, '');
			},
		},
	};

	return (
		<div className={styles.form_container}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					let newControl = { ...controlItem };

					const {
						type,
						name: controlName,
						optionsListKey = '',
						commodityType = '',
						span,
						subLabel = '',
						controls: innerControls,
					} = newControl;

					if (optionsListKey) {
						const finalOptions = getOptions(optionsListKey, type);

						newControl = { ...newControl, options: finalOptions };
					}

					if (commodityType) {
						const containerType = fieldArrayValues?.[index]?.container_type;

						const keyOptions = getCommodityList(commodityType, containerType);

						const finalOptions = keyOptions;

						newControl = { ...newControl, options: finalOptions };
					}

					const flex = (span || 12) / 12 * 100;

					if (innerControls) {
						return (
							<div key={name} className={styles.form_item} style={{ width: `${flex}%` }}>
								<div className={styles.heading}>{newControl.label || lowerlabel}</div>

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
													{innerControlItem?.rules?.required ? (
														<div className={styles.required_mark}>*</div>
													) : null}
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
													{error?.[innerControlName]?.message
													|| error?.[innerControlName]?.type}
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
							key={`create_form_${newControl.name}_${index}`}
						>
							{(showLabelOnce && index === 0 && newControl.label)
							|| (!showLabelOnce && newControl.label) ? (
								<div className={styles.heading}>
									{newControl.label || lowerlabel}
									{newControl?.rules?.required ? (
										<div className={styles.required_mark}>*</div>
									) : null}
								</div>
								) : null}

							<Element
								width="100%"
								key={`create_form_${newControl.name}_${index}`}
								itemKey={`create_form_${newControl.name}_${index}`}
								control={control}
								id={`create_form_${newControl.name}_${index}`}
								{...newControl}
								{...CHANGE_MAPPING[controlName] || {}}
								disabled={disabled}
								name={`${name}[${index}].${newControl.name}`}
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
