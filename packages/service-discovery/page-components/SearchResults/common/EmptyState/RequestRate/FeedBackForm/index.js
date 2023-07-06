import React from 'react';

import getElementController from '../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../configs/getErrorMessage';

import styles from './styles.module.css';

const TOTAL_SPAN = 12;
const FLEX_HUNDRED = 100;
const FLEX_ONE = 1;

function FeedBackForm({ controls, control, errors }) {
	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { name, label, type, span } = controlItem;

				const Element = getElementController(type || 'text');
				if (!Element) return null;

				const errorOriginal = getErrorMessage({
					error : errors?.[controlItem.name],
					rules : controlItem?.rules,
					label : controlItem?.label,
				});

				const flex = ((span || TOTAL_SPAN) / TOTAL_SPAN) * FLEX_HUNDRED - FLEX_ONE;

				return (
					<div key={`${name}_${label}`} className={styles.form_item} style={{ width: `${flex}%` }}>
						{label ? (
							<div className={styles.label}>
								{label || ''}

								{controlItem?.rules?.required ? (
									<span className={styles.required_mark}>*</span>
								) : null}
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

export default FeedBackForm;
