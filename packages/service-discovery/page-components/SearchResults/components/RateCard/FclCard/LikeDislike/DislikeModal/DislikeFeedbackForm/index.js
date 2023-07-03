import React from 'react';

import getElementController from '../../../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../../../configs/getErrorMessage';
import getFeedbackConfig from '../../../../../../configurations/getFeedBackConfig';

import getShowElements from './get-show-elements';
import styles from './styles.module.css';

function DislikeFeedbackForm({ rate = {}, control, errors = {}, formValues = {} }) {
	const controls = getFeedbackConfig(rate?.service_type);

	// if (rate?.service_type === 'air_freight') {
	// 	controls = controls.map((control) => {
	// 		const item = { ...control };
	// 		if (item.name === 'preferred_airline_ids') {
	// 			item.defaultOptions = airlineOptions;
	// 		}
	// 		return item;
	// 	});
	// }

	const showElements = getShowElements(controls, formValues);

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { name, label, type, span } = controlItem;

				const Element = getElementController(type);
				if (!Element) return null;

				const errorOriginal = getErrorMessage({
					error : errors?.[controlItem.name],
					rules : controlItem?.rules,
					label : controlItem?.label,
				});

				const flex = (span || 12) / 12 * 100;

				const show = !(controlItem.name in showElements) || showElements[controlItem.name];

				if (!show) {
					return null;
				}

				return (
					<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
						{label ? (
							<div className={styles.label}>
								{label || ''}
							</div>
						) : null}

						<Element
							{...controlItem}
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

export default DislikeFeedbackForm;
