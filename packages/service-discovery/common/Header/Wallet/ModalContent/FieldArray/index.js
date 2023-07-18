import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	controls,
	error,
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	buttonText = 'Add',
	watch,
	setValue,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = () => {
		append(childEmptyValues);
	};

	if (isEmpty(fields)) {
		append(childEmptyValues);
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
					<div className={styles.child} key={`${field.id}_${name}`}>
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
						onClick={handleAppendChild}
					>
						<IcMPlus height={22} width={22} className={styles.add_icon} fill="black" />
						{buttonText}
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default FieldArray;
