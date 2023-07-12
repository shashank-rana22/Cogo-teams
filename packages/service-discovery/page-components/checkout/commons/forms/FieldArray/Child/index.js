import { IcMDelete } from '@cogoport/icons-react';

import getElementController from '../../getElementController';

import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 1,
		disabled = false,
		error = {},
		deleteMargin = '12px',
		field,
	} = props;

	console.log('field', field);

	return (
		<div className={styles.content}>
			{controls.map((indControl) => {
				const { style, ...controlItem } = indControl;
				const Element = getElementController(controlItem.type);

				if (!Element) return null;

				return (
					<div
						key={`${name}.${index}.${controlItem.name}`}
						className={styles.list}
						style={indControl.style}
					>
						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlItem.name}`}
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...(controlItem.type === 'file-uploader'
								? removeTypeField(controlItem) : { ...controlItem })}
							name={`${name}.${index}.${controlItem.name}`}
							value={field[controlItem.name]}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, 1)}
					style={{
						height    : '20px',
						width     : '20px',
						marginTop : deleteMargin,
						cursor    : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
