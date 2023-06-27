import React from 'react';

import getElementController from '../../../../../../configs/getElementController';

import Detention from './Detention';
import FieldArray from './FieldArray';
import styles from './styles.module.css';

function FilterItem({ controls, control, watch, errors, handleSubmit, setValue }) {
	const formValues = watch();

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { label, type, name, controls: innerControls, span } = controlItem;

				const flex = (span || 12) / 12 * 100;

				if (type === 'field-array') {
					return (
						<div className={styles.form_item} key={`${name}_${label}`} style={{ width: `${flex}%` }}>
							<FieldArray
								{...controlItem}
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
								className={`${styles.label} ${controlItem?.boldLabel ? styles.bold_label : {}}`}
							>
								{controlItem.label}
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
												{errors?.[innerControlName]?.message
												|| errors?.[innerControlName]?.type}
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
					<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
						<div className={styles.label}>
							{label || ''}
							{' '}
							{controlItem?.rules ? (
								<div className={styles.required_mark}>*</div>
							) : null}
						</div>

						<Element
							{...controlItem}
							name={name}
							label={label}
							control={control}
						/>

						{errors[name] && (
							<div className={styles.error_message}>
								{errors[name]?.message || errors?.[name]?.type}
							</div>
						)}

					</div>
				);
			})}
		</div>
	);
}

export default FilterItem;
