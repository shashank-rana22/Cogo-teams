import { ButtonIcon } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import FormElement from '../FormElement';
import getCustomOptions from '../getCustomOptions';
import getWidthPercent from '../getWidthPercent';

import getTotalFields from './getTotalFields';
import styles from './styles.module.css';

const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const INCREMENT_BY_ONE = 1;
const TOTAL_SPAN = 12;
const ONE = 1;

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
	showHeading = true,
	customField = {},
	setValue = () => { },
	fields = [],
}) {
	const total_fields = getTotalFields({ controls });

	const { slab_details = [] } = formValues;

	useEffect(() => {
		if (!isEmpty(slab_details)) {
			if (index > 0) {
				setValue(`slab_details.${index}.slab_unit`, slab_details[index - ONE].slab_unit);
				setValue(
					`slab_details.${index}.slab_lower_limit`,
					Number(slab_details[index - ONE].slab_upper_limit) + ONE,
				);
				setValue(`slab_details.${index}.fee_unit`, slab_details[index - ONE].fee_unit);
				setValue(`slab_details.${index}.fee_currency`, slab_details[index - ONE].fee_currency);
			}
		}
	}, [index, name, setValue, slab_details]);

	return (
		<div key={field.id} className={styles.child}>
			{showHeading ? (
				<div className={styles.heading}>
					{`${startCase(name || 'document')} ${index + INCREMENT_BY_ONE}`}
				</div>
			) : null}

			<div className={styles.row_flex}>
				{Object.keys(total_fields).map((rowFields) => (
					<div className={styles.row} key={rowFields}>
						{total_fields[rowFields].map((controlItem) => {
							const { span, name:ctrlItemName, rules = {} } = controlItem || {};

							const flex = getWidthPercent(span || TOTAL_SPAN);
							const element_name = `${name}.${index}.${ctrlItemName}`;

							let options = [];

							if (controlItem?.options_key) {
								options = getCustomOptions({
									...controlItem,
									isFieldArray : true,
									name         : element_name,
									formValues,
								});
							}

							let newProps = { ...controlItem };
							if (ctrlItemName === 'slab_upper_limit' && index !== fields.length - 1) {
								newProps = {
									...controlItem,
									disabled: true,
								};
							}

							return (
								<div className={styles.element} style={{ width: `${flex}%` }} key={ctrlItemName}>
									{index === 0 ? (
										<h4 className={styles.label}>
											{newProps?.label}

											{rules?.required ? (
												<sup style={{
													marginLeft : '4px',
													color      : '#f00',
												}}
												>
													*
												</sup>
											) : null}

										</h4>

									) : null}

									<FormElement
										{...newProps}
										{...(customField?.[ctrlItemName] || {})}
										key={element_name}
										name={element_name}
										control={control}
										type={newProps.type}
										{...newProps?.options_key ? { options } : {}}
									/>

									{error?.[newProps]?.message ? (
										<p className={styles.error}>
											{error?.[newProps]?.message || ''}
										</p>
									) : null}
								</div>

							);
						})}

					</div>

				))}
				<div>
					{showDeleteButton && index >= noDeleteButtonTill && index === fields.length - 1 ? (
						<div className={styles.delete_icon}>
							<ButtonIcon
								icon={<IcMDelete />}
								onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)}
							/>
						</div>
					) : null}
				</div>

			</div>
		</div>
	);
}

export default Child;
