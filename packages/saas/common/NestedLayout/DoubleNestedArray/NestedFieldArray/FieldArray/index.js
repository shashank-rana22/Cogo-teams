import { Button, ButtonIcon } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import Child from '../../../FieldArray/Child';

import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
function FieldArray({
	ctrl = {}, control = {}, error = {}, formValues = {}, name = '', index = 0,
	showElements = {}, customFieldArrayControls = {},
}) {
	const {
		controls = [],
		name:nestedName = '',
		addButtonText = '',
		type = '',
		showButtons = true,
	} = ctrl || {};
	const { fields, append, remove } = useFieldArray({ control, name: `${name}.${index}.${nestedName}` });
	return (
		<div className={styles.field_array}>
			{fields.map((field, nestedIndex) => (
				<div key={field.id} className={styles.nested_container}>
					{type === 'nestedFieldArray' ? (
						<div>
							<div className={styles.row_flex}>
								<div>
									{`${startCase(nestedName || 'document')} ${nestedIndex + HEADING_INDEX_OFFSET}`}
								</div>
								<ButtonIcon
									icon={<IcMDelete />}
									onClick={() => remove(nestedIndex, NO_OF_ELEMENTS_TO_BE_REMOVED)}
								/>
							</div>

							{controls.map((nestCtrl) => (
								<FieldArray
									key={field.id}
									field={field}
									error={error?.[nestedIndex]}
									ctrl={nestCtrl}
									control={control}
									index={nestedIndex}
									name={`${name}.${index}.${nestedName}`}
									formValues={formValues}
									showElements={showElements}
									customFieldArrayControls={customFieldArrayControls?.[nestedIndex]}
								/>
							))}

						</div>
					) : (
						<Child
							showElements={showElements}
							key={field.id}
							remove={remove}
							field={field}
							error={error?.[nestedName]?.[nestedIndex]}
							controls={controls}
							control={control}
							index={nestedIndex}
							name={`${name}.${index}.${nestedName}`}
							formValues={formValues}
							labelName={nestedName}
							customField={customFieldArrayControls?.[nestedIndex]}
						/>
					)}

				</div>
			))}

			{showButtons ? (
				<div>
					<Button
						size="sm"
						onClick={append}
						style={{ margin: 4 }}
					>
						{addButtonText || 'Add'}
					</Button>

				</div>
			) : null}

		</div>
	);
}

export default FieldArray;
