import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../../configs/getErrorMessage';
import getOptions from '../../../../../utils/getOptions';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 1;
const ZEROTH_INDEX = 0;
const FIRST_INDEX = 1;
const TWO_VALUE = 2;

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
	setValue,
	isSubControl = false,
	fieldArrayValues = {},
}) {
	const ON_CHANGE_MAPPING = {
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
						controls: subControls,
					} = newControl;

					const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

					if (subControls) {
						return (
							<div key={name} className={styles.form_item} style={{ width: `${flex}%` }}>
								{newControl?.showTopLabelOnly ? (
									<div className={styles.heading}>{newControl.label || lowerlabel}</div>
								) : null}

								<Child
									key={name}
									index={index}
									control={control}
									controls={subControls}
									name={name}
									lowerlabel={lowerlabel}
									remove={remove}
									error={error}
									fieldArrayValues={fieldArrayValues}
									disabled={disabled}
									length={length}
									showLabelOnce={showLabelOnce}
									setValue={setValue}
									isSubControl
								/>
							</div>
						);
					}

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

					const Element = getElementController(type);

					const errorOriginal = getErrorMessage({
						error : error?.[controlName],
						rules : controlItem?.rules,
						label : controlItem?.label,
					});

					return (
						<div
							className={styles.form_item}
							style={{ width: `${flex}%` }}
							key={`create_form_${newControl.name}_${index}`}
						>
							{(showLabelOnce && index === ZEROTH_INDEX && newControl.label && !isSubControl)
							|| (!showLabelOnce && newControl.label && !isSubControl) ? (
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
								{...ON_CHANGE_MAPPING[controlName] || {}}
								disabled={disabled}
								name={`${name}[${index}].${newControl.name}`}
							/>
							{subLabel ? (
								<div className={styles.sub_label}>{subLabel}</div>
							) : null}
							<div className={styles.error_message}>
								{errorOriginal}
							</div>
						</div>
					);
				})}

			</div>

			{length >= TWO_VALUE && !disabled && !isSubControl ? (
				<IcMDelete
					className={styles.remove_icon}
					onClick={() => remove(index, FIRST_INDEX)}
				/>
			) : null}
		</div>
	);
}
export default Child;
