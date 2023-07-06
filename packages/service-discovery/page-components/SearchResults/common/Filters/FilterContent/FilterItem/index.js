import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import React from 'react';

import getElementController from '../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../configs/getErrorMessage';
import getOptions from '../../../../utils/getOptions';
import Detention from '../../../Detention';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

function FilterItem({ controls, control, watch, errors, handleSubmit, setValue }) {
	const formValues = watch();

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				let newControl = { ...controlItem };

				const { label, type, name, controls: innerControls, span, ...rest } = newControl;

				const flex = (span || 12) / 12 * 100;

				if (type === 'field-array') {
					return (
						<div className={styles.form_item} key={`${name}_${label}`} style={{ width: `${flex}%` }}>
							<FieldArray
								{...newControl}
								formValues={formValues}
								control={control}
								watch={watch}
								handleSubmit={handleSubmit}
								error={errors?.[name]}
								setValue={setValue}
							/>
						</div>
					);
				}

				if (type === 'detention-demurrage') {
					return (
						<div className={styles.form_item} key={`${name}_${label}`} style={{ width: `${flex}%` }}>
							<Detention control={control} />
						</div>
					);
				}

				if (innerControls) {
					return (
						<div key={name} className={styles.form_item} style={{ width: `${flex}%` }}>
							<div
								className={`${styles.label} ${newControl?.boldLabel ? styles.bold_label : {}}`}
							>
								{newControl.label}
							</div>

							<div className={styles.content}>
								{innerControls.map((innerControlItem) => {
									const {
										type: innerType,
										name: innerControlName,
										span: innerSpan,
									} = innerControlItem;

									const innerFlex = (innerSpan || 12) / 12 * 100;

									const Element = getElementController(innerType);

									const innerErrorMessage = getErrorMessage({
										error : errors?.[innerControlItem.name],
										rules : innerControlItem?.rules,
										label : innerControlItem?.label,
									});

									return (
										<div
											className={styles.form_item}
											style={{ width: `${innerFlex}%`, marginBottom: 0 }}
											key={`${innerControlName}`}
										>
											{innerControlItem.label ? (
												<div className={styles.label}>
													{innerControlItem.label}
													{innerControlItem?.rules?.required ? (
														<div className={styles.required_mark}>*</div>
													) : null}
												</div>
											) : null}

											<Element
												width="100%"
												key={`create_form_${innerControlItem.name}`}
												itemKey={`create_form_${innerControlItem.name}`}
												control={control}
												id={`create_form_${innerControlItem.name}`}
												{...innerControlItem}
												name={`${name}${innerControlItem.name}`}
											/>

											<div className={styles.error_message}>
												{innerErrorMessage}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				}

				if (rest.optionsListKey) {
					const finalOptions = getOptions(rest.optionsListKey, type);

					newControl = { ...newControl, options: finalOptions };
				}

				if (rest.commodityType) {
					const containerType = formValues?.container_type;

					const keyOptions = getCommodityList(rest.commodityType, containerType || null);

					const finalOptions = keyOptions;

					newControl = { ...newControl, options: finalOptions };
				}

				const Element = getElementController(type);

				const errorOriginal = getErrorMessage({
					error : errors?.[newControl.name],
					rules : newControl?.rules,
					label : newControl?.label,
				});

				return (
					<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
						<div className={styles.label}>
							{label || ''}
							{' '}
							{newControl?.rules?.required ? (
								<div className={styles.required_mark}>*</div>
							) : null}
						</div>

						<Element
							{...newControl}
							name={name}
							label={label}
							control={control}
						/>

						{errors[name] && (
							<div className={styles.error_message}>
								{errorOriginal}
							</div>
						)}

					</div>
				);
			})}
		</div>
	);
}

export default FilterItem;
