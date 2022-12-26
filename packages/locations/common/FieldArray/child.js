import React from 'react';

import getElementController from '../../constants/getController';

import styles from './styles.module.css';
import TrashIcon from './trash.svg';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
}) {
	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getElementController(controlItem.type);
				if (!Element) return null;
				return (
					<div className={styles.list}>
						<h4>{controlItem.label}</h4>
						<Element
							width="100%"
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...controlItem}
						/>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<TrashIcon
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, 1)}
					style={{ width: '2em', height: '2em' }}
				/>
			) : null}
		</div>
	);
}
export default Child;
