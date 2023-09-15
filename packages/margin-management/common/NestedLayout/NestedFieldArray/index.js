import { Button, ButtonIcon } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FormElement from '../FormElement';
import getWidthPercent from '../getWidthPercent';

import FieldArray from './FieldArray';
import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;

function NestedFieldArray({
	ctrl = {}, control = {}, error = {}, showButtons = true, formValues = {},
	showElements = {},
}) {
	const { controls = [], name, addButtonText = '' } = ctrl || {};

	const { fields, append, remove } = useFieldArray({ control, name });
	return (
		<div className={styles.nested_field_array}>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.field_container}>
					<div className={styles.field_header}>
						<div>{`${startCase(name || 'document')} ${index + HEADING_INDEX_OFFSET}`}</div>
						<ButtonIcon icon={<IcMDelete />} onClick={() => remove(index, NO_OF_ELEMENTS_TO_BE_REMOVED)} />
					</div>

					{controls.map((nestCtrl) => (
						nestCtrl?.type === 'fieldArray' ? (
							<FieldArray
								key={field.id}
								field={field}
								error={error?.[index]}
								ctrl={nestCtrl}
								control={control}
								index={index}
								name={name}
								formValues={formValues}
								showElements={showElements}
								showButtons={showButtons}
							/>
						) : (
							<div
								key={nestCtrl.name}
								className={styles.element_container}
								style={{ width: `${getWidthPercent(nestCtrl?.width)}%` }}
							>
								{nestCtrl?.label ? (
									<div
										className={styles.label}
									>
										{nestCtrl?.label}
									</div>
								) : null}

								{nestCtrl?.type ? (
									<FormElement
										control={control}
										{...nestCtrl}
										type={nestCtrl?.type}
									/>
								) : null}

								{nestCtrl?.errors?.[nestCtrl.name]
									? (
										<div className={styles.errors}>
											{nestCtrl?.errors[nestCtrl.name]?.message}
										</div>
									)
									: null}
							</div>
						)

					))}

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
