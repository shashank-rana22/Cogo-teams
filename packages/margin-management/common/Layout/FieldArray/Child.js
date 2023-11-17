import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FormElement from '../FormElement';
import getCustomOptions from '../getCustomOptions';
import getWidthPercent from '../getWidthPercent';

import getTotalFields from './getTotalFields';
import styles from './styles.module.css';

const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const INCREMENT_BY_ONE = 1;
const TOTAL_SPAN = 12;

function Child({
	controls = [],
	control = {},
	index = 0,
	name = '',
	field = {},
	noDeleteButtonTill = 0,
	showDeleteButton = true,
	error = {},
	remove = () => {},
	formValues = {},
	showElements = {},
}) {
	const total_fields = getTotalFields({ controls });

	return (
		<div key={field.id} className={styles.child}>
			<div className={styles.heading}>
				{`${startCase(name || 'document')} ${index + INCREMENT_BY_ONE}`}
			</div>

			<div className={styles.row_flex}>
				{Object.keys(total_fields).map((rowFields) => (
					<div className={styles.row} key={rowFields}>
						{total_fields[rowFields].map((controlItem) => {
							const { span, name:ctrlItemName } = controlItem || {};

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

							return (
								<div className={styles.element} style={{ width: `${flex}%` }} key={ctrlItemName}>
									<h4 className={styles.label}>
										{controlItem?.label}
									</h4>

									<FormElement
										{...controlItem}
										key={element_name}
										name={element_name}
										control={control}
										type={controlItem.type}
										{...controlItem?.options_key ? { options } : {}}

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

				{showDeleteButton && index >= noDeleteButtonTill ? (
					<div className={styles.delete_icon}>
						<ButtonIcon icon={<IcMDelete />} onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)} />
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Child;
