import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useEffect } from 'react';

import FormElement from '../FormElement';
import getCustomOptions from '../getCustomOptions';
import getWidthPercent from '../getWidthPercent';

import getTotalFields from './getTotalFields';
import styles from './styles.module.css';

const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const TOTAL_SPAN = 12;

function Child({
	controls = [],
	control = {},
	index = 0,
	name = '',
	field = {},
	// noDeleteButtonTill = 0,
	// showDeleteButton = true,
	error = {},
	remove = () => {},
	formValues = {},
	showElements = {},
	watch = () => { },
	setValue = () => { },
	showLabelOnce = true,
}) {
	const disableUpperLimit = watch(`${name}`)?.length;

	const total_fields = getTotalFields({ controls });

	const prevSlabUpperLimit = watch(`${name}.${index - 1}.upper_limit`);

	const limit_currency = watch(`${name}.0.limit_currency`);

	useEffect(() => {
		if (index > 0) {
			setValue(
				`${name}.${index}.lower_limit`,
				Number(prevSlabUpperLimit) + 1,
			);
		}
		if (index > 0) {
			setValue(
				`${name}.${index}.limit_currency`,
				limit_currency,
			);
		}
	}, [index, name, prevSlabUpperLimit, setValue, limit_currency]);

	return (
		<div key={field.id} className={styles.child}>
			<div className={styles.row_flex}>
				{Object.keys(total_fields).map((rowFields) => (
					<div className={styles.row} key={rowFields}>
						{controls.map((controlItem) => {
							const { span, name: ctrlItemName } = controlItem || {};

							const flex = getWidthPercent(span || TOTAL_SPAN);
							const element_name = `${name}.${index}.${ctrlItemName}`;

							const show = !(controlItem.name in showElements) || showElements[controlItem.name];

							let options = [];

							if (controlItem?.options_key) {
								options = getCustomOptions({
									...controlItem,
									isFieldArray : true,
									name         : element_name,
									formValues,
								});
							}

							if (!show) {
								return null;
							}

							let newControlItem = { ...controlItem };

							if (controlItem.name === 'lower_limit') {
								newControlItem = {
									...newControlItem,
									disabled: true,
								};
							}

							if (controlItem.name === 'upper_limit' && index !== disableUpperLimit - 1) {
								newControlItem = {
									...newControlItem,
									disabled: true,
								};
							}

							if (controlItem.name === 'limit_currency' && index !== 0) {
								newControlItem = {
									...newControlItem,
									disabled: true,
								};
							}

							return (
								<div className={styles.element} style={{ width: `${flex}%` }} key={ctrlItemName}>
									{showLabelOnce && index === 0 ? (
										<h4 className={styles.label}>
											{newControlItem?.label}
										</h4>
									) : null}

									<FormElement
										{...newControlItem}
										key={element_name}
										name={element_name}
										control={control}
										type={newControlItem.type}
										{...newControlItem?.options_key ? { options } : {}}

									/>

									{error?.[ctrlItemName]?.message ? (
										<p className={styles.error}>
											{error?.[ctrlItemName]?.message || ''}
										</p>
									) : null}
								</div>

							);
						})}

					</div>
				))}

				{index === (watch(`${name}`) || []).length - 1 && (watch(`${name}`) || []).length > 1 ? (
					<div className={styles.delete_icon}>
						<ButtonIcon icon={<IcMDelete />} onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Child;
