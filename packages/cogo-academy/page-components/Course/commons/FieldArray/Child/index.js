import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
	} = props;

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getFieldController(controlItem.type);

				if (!Element) return null;

				return (
					<div className={styles.list}>
						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlItem.name}`}
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem.name}`}
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
						marginTop : '16px',
						cursor    : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
