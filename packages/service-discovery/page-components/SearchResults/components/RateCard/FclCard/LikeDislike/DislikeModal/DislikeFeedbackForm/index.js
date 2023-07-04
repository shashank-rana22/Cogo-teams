import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../../../configs/getErrorMessage';
import getFeedbackConfig from '../../../../../../configurations/getFeedBackConfig';

import getShowElements from './get-show-elements';
import styles from './styles.module.css';

function DislikeFeedbackForm({
	rate = {},
	control,
	errors = {},
	formValues = {},
	setValue = () => {},
	watch = () => {},
}) {
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

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'feedbacks' && !isEmpty(value[name])) {
				const feedbackValue = value[name];

				if (!feedbackValue.includes('unsatisfactory_rate')) {
					setValue('preferred_freight_rate_currency', null);
					setValue('preferred_freight_rate', null);
				}

				if (!feedbackValue.includes('unsatisfactory_airline')) {
					setValue('preferred_airline_ids', null);
				}

				if (!feedbackValue.includes('unsatisfactory_destination_detention')) {
					setValue('preferred_detention_days', null);
				}

				if (!feedbackValue.includes('unpreferred_shipping_lines')) {
					setValue('preferred_shipping_line_ids', null);
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [setValue, watch]);

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
