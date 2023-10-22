import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FormElement from '../FormElement';
import getWidthPercent from '../getWidthPercent';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const TOTAL_SPAN = 12;

function NestedFieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	showElements = {}, customFieldArrayControls = {}, watch = () => { }, setValue = () => { },
}) {
	const { controls = [], name, addButtonText = '' } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	return (
		<div className={styles.nested_field_array}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.field_header}>
						<div className={styles.top_label}>
							{`${startCase(name || 'document')} ${index + HEADING_INDEX_OFFSET}`}
						</div>
						{index === fields.length - 1 && index !== 0 ? (
							<Button
								onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)}
								title="Remove"
								themeType="secondary"
							>
								<IcMDelete height={16} width={16} />
								{`Remove Slab ${index + 1}`}
							</Button>
						) : null}
					</div>

					{controls.map((nestCtrl) => {
						const { type = '', name:ctrlItemName, span, ...restCtrl } = nestCtrl;
						if (['fieldArray', 'nestedFieldArray'].includes(type)) {
							return (
								<div key={field.id} className={styles.nested_container}>
									<FieldArray
										key={field.id}
										field={field}
										error={error?.[index]}
										ctrl={nestCtrl}
										control={control}
										index={index}
										name={name}
										formValues={formValues}
										showElements={showElements?.[index]}
										customFieldArrayControls={customFieldArrayControls?.[name]}
										watch={watch}
										setValue={setValue}
									/>
								</div>
							);
						}

						const element_name = `${name}.${index}.${ctrlItemName}`;

						const flex = getWidthPercent(span || TOTAL_SPAN);

						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={ctrlItemName}>
								<h4 className={styles.label}>
									{nestCtrl?.label}
								</h4>

								<FormElement
									{...restCtrl}
									key={element_name}
									name={element_name}
									control={control}
									type={type}
								/>
								{error?.[index]?.[ctrlItemName]?.message ? (
									<p className={styles.error}>
										{error?.[index]?.[ctrlItemName]?.message || ''}
									</p>
								) : null}
							</div>
						);
					})}

				</div>
			))}

			{showButtons ? (
				<div>
					<Button
						size="md"
						onClick={append}
					>
						{addButtonText || 'Add'}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default NestedFieldArray;
