import { Button, cl } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import Child from './child';
import styles from './styles.module.css';

const SECOND_INDEX = 2;

function FieldArray({
	name = '',
	control = () => {},
	controls = [],
	error = [],
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	buttonText = 'Add',
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || '';
	});

	controls.forEach((controlItem) => {
		if (controlItem.name === 'handling_type') {
			CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value || 'stackable';
		} else if (controlItem.name === 'weight_unit') {
			CHILD_EMPTY_VALUES[controlItem.name] = `kg_${
				rest.selectedWeightType.split('_')[SECOND_INDEX]
			}`;
		} else {
			CHILD_EMPTY_VALUES[controlItem.name] = controlItem.value;
		}
	});

	const handleAppendChild = () => {
		append(CHILD_EMPTY_VALUES);
	};

	if (isEmpty(fields)) {
		append(CHILD_EMPTY_VALUES);
	}

	const form = watch();

	useEffect(() => {
		if (!rest.defaultValue) return;
		setValue(name, rest.defaultValue);
	}, [name, rest.defaultValue, setValue]);

	return (
		<div className={styles.container}>
			<div className={styles.childs_container}>
				{fields.map((field, index) => (
					<div
						className={cl`${styles.child} ${index && styles.divider}`}
						key={`${field.id}_${name}`}
					>
						<Child
							{...rest}
							field={field}
							index={index}
							control={control}
							controls={controls}
							name={name}
							lowerlabel={field.label}
							remove={remove}
							error={error?.[index]}
							disabled={disabled}
							length={fields.length}
							showLabelOnce={showLabelOnce}
							watch={watch}
							setValue={setValue}
							fieldArrayValues={form[name]}
						/>
					</div>
				))}
			</div>

			{showButtons && !disabled ? (
				<div className={styles.add_button}>
					<Button
						type="button"
						size="md"
						themeType="link"
						onClick={handleSubmit(handleAppendChild)}
					>
						<IcMPlus height={22} width={22} className={styles.add_icon} fill="#000" />
						{buttonText}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
