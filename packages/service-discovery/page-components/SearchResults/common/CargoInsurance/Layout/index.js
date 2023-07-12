import React from 'react';

import getElementController from '../../../../../configs/getElementController';
import getErrorMessage from '../../../../../configs/getErrorMessage';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 1;

function Layout({ controls = [], control, errors = {} }) {
	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const newControl = { ...controlItem };

				const { label, type, name, span } = newControl;

				const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

				// if (type === 'field-array') {
				// 	return (
				// 		<div className={styles.form_item} key={`${name}_${label}`} style={{ width: `${flex}%` }}>
				// 			<FieldArray
				// 				{...newControl}
				// 				control={control}
				// 				watch={watch}
				// 				handleSubmit={handleSubmit}
				// 				error={errors?.[name]}
				// 				setValue={setValue}
				// 			/>
				// 		</div>
				// 	);
				// }

				// if (rest.optionsListKey) {
				// 	const finalOptions = getOptions(rest.optionsListKey, type);

				// 	newControl = { ...newControl, options: finalOptions };
				// }

				// if (rest.commodityType) {
				// 	const containerType = watch('container_type');

				// 	const keyOptions = getCommodityList(rest.commodityType, containerType || null);

				// 	const finalOptions = keyOptions;

				// 	newControl = { ...newControl, options: finalOptions };
				// }

				const Element = getElementController(type);

				const errorMessage = getErrorMessage({
					error : errors?.[newControl.name],
					rules : newControl?.rules,
					label : newControl?.label,
				});

				return (
					<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
						<div className={`${styles.label} ${newControl?.boldLabel ? styles.bold_label : {}}`}>
							{newControl?.boldLabel || label || ''}
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
								{errorMessage}
							</div>
						)}

					</div>
				);
			})}
		</div>
	);
}

export default Layout;
