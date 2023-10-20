import { Button, ButtonIcon } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FormElement from '../../FormElement';
import getWidthPercent from '../../getWidthPercent';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
const TOTAL_SPAN = 12;

function NestedFieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	showElements = {}, customFieldArrayControls = {}, name = '',
}) {
	const { controls = [], addButtonText = '',	name:nestedName = '' } = ctrl || {};
	const { fields, append, remove } = useFieldArray({ control, name });
	return (
		<div className={styles.nested_field_array}>
			{fields.map((field, nestedIndex) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.field_header}>
						<div>{`${startCase(nestedName || 'document')} ${nestedIndex + HEADING_INDEX_OFFSET}`}</div>
						<ButtonIcon
							icon={<IcMDelete />}
							onClick={() => remove(nestedIndex, NO_OF_ELEMENTS_TO_BE_REMOVED)}
						/>
					</div>

					{controls.map((nestCtrl) => {
						const { type = '', name:ctrlItemName, span, ...restCtrl } = nestCtrl;
						if (['fieldArray'].includes(type)) {
							return (
								<div key={field.id} className={styles.nested_container}>
									<FieldArray
										key={field.id}
										field={field}
										error={error?.[nestedIndex]}
										ctrl={nestCtrl}
										control={control}
										index={nestedIndex}
										name={name}
										formValues={formValues}
										showElements={showElements}
										customFieldArrayControls={customFieldArrayControls?.[name]}
									/>
								</div>
							);
						}

						const element_name = `${name}.${nestedIndex}.${ctrlItemName}`;

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
								{error?.[nestedIndex]?.[ctrlItemName]?.message ? (
									<p className={styles.error}>
										{error?.[nestedIndex]?.[ctrlItemName]?.message || ''}
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
						size="sm"
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
