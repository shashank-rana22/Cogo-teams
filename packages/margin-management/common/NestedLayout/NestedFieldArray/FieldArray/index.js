import { Button, ButtonIcon } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import Child from '../../FieldArray/Child';

import styles from './styles.module.css';

const HEADING_INDEX_OFFSET = 1;
const NO_OF_ELEMENTS_TO_BE_REMOVED = 1;
function FieldArray({
	ctrl = {}, control = {}, error = {}, formValues = {}, name = '', index = 0,
	showElements = {}, customFieldArrayControls = {}, watch = () => { }, setValue = () => { },
}) {
	const {
		controls = [],
		name:nestedName = '',
		addButtonText = '',
		type = '',
		showButtons = true,
		...rest
	} = ctrl || {};

	const { fields, append, remove } = useFieldArray({
		control,
		name: `${name}.${index}.${nestedName}`,
	});

	const CHILD_EMPTY_VALUE = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUE[controlItem.name] = controlItem.value || '';
	});

	if (isEmpty(fields)) {
		fields.push(CHILD_EMPTY_VALUE);
	}

	const currentSlabCurrency = watch(`${name}.${index}.limit_currency`);

	const limitCurrencyForAllSlabs = watch(`${name}.0.limit_currency`);

	useEffect(() => {
		if (index >= 1) {
			setValue(
				`${name}.${index}.limit_currency`,
				limitCurrencyForAllSlabs || currentSlabCurrency,
			);
		}
	}, [limitCurrencyForAllSlabs, currentSlabCurrency, index, setValue, name]);

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
							{...rest}
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
							watch={watch}
							setValue={setValue}
							currentSlabCurrency={currentSlabCurrency}
						/>
					)}

				</div>
			))}

			{showButtons ? (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						size="md"
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
