import { Button, Toast } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function FieldArray({
	name,
	control,
	formValues,
	controls,
	error,
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	actionOnAdd = {},
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
		if (actionOnAdd && typeof actionOnAdd === 'function') {
			actionOnAdd({
				onSuccess: () => {
					append(childEmptyValues);
				},
			});
			return;
		}
		let fieldIsNotEmpty = true;
		const { videos } = formValues;
		videos.forEach((video) => {
			if (!video.video_item || video.video_item?.length === 0) fieldIsNotEmpty = false;
		});
		if (fieldIsNotEmpty) {
			append(childEmptyValues);
		} else {
			Toast.error('Input field is empty!');
		}
	};

	if (isEmpty(fields)) {
		fields.push(childEmptyValues);
	}

	return (
		<div className={styles.container}>
			<div className={styles.childs_container}>
				{fields.map((field, index) => (
					<div className={styles.child}>
						<Child
							{...rest}
							key={`${field.id}_${name}`}
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
						/>
					</div>

				))}
			</div>
			{showButtons && !disabled ? (
				<Button
					type="button"
					themeType="secondary"
					className={styles.add_button}
					onClick={() => handleAppendChild()}
				>
					+ADD
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
