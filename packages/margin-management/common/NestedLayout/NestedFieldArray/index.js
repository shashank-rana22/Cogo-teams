import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import FormElement from '../FormElement';
import getWidthPercent from '../getWidthPercent';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const TOTAL_SPAN = 12;

function NestedFieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	showElements = {}, customFieldArrayControls = {}, watch = () => { }, setValue = () => { },
}) {
	const { controls = [], name, addButtonText = '', validateFn = () => { }, noDeleteButtonTill = 1 } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });

	const handleAppendChild = () => {
		if (validateFn) {
			validateFn(control, append);
		}
	};

	const onHandleRemove = () => {
		remove(fields.length - HEADING_INDEX_OFFSET, HEADING_INDEX_OFFSET);
	};

	return (
		<div className={styles.nested_field_array}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.field_header}>
						<div className={styles.top_label}>
							{`${startCase(name || 'document')} ${index + HEADING_INDEX_OFFSET}`}
						</div>
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

						let modifiedRestControls = { ...restCtrl };
						if (ctrlItemName === 'upper_limit') {
							if (index !== fields.length - 1) {
								modifiedRestControls = {
									...modifiedRestControls,
									disabled: true,
								};
							}
						}

						if (ctrlItemName === 'limit_currency' && index >= 1) {
							modifiedRestControls = {
								...modifiedRestControls,
								disabled: true,
							};
						}

						return (
							<div className={styles.element} style={{ width: `${flex}%` }} key={ctrlItemName}>
								<h4 className={styles.label}>
									{nestCtrl?.label}
								</h4>

								<FormElement
									{...modifiedRestControls}
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
				<div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '24px' }}>
					<Button
						size="md"
						onClick={handleAppendChild}
					>
						{addButtonText || 'Add'}
					</Button>
					{!isEmpty(fields.length) && fields.length > noDeleteButtonTill
						? (
							<Button
								onClick={onHandleRemove}
								title="Remove"
								themeType="secondary"
							>
								<IcMDelete height={16} width={16} />
								Remove Slab
							</Button>
						)
						: null}
				</div>
			) : null}
		</div>
	);
}

export default NestedFieldArray;
