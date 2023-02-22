import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getElementController from '../getController';

import styles from './styles.module.css';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 1,
	disabled = false,
}) {
	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getElementController(controlItem.type);
				if (!Element) return null;

				// eslint-disable-next-line no-param-reassign
				// delete controlItem.name;
				return (
					<div className={styles.list}>
						<Element
							width="100%"
							control={control}
							id={`create_form_${controlItem.name}_${index}_field`}
							// name={`create_form_${controlItem.name}_${index}_field`}
							{...controlItem}
						/>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, 1)}
					style={{ width: '2em', height: '2em', paddingBottom: 6, cursor: 'pointer' }}
				/>
			) : <div style={{ width: '2em', height: '2em' }} />}
		</div>
	);
}
export default Child;
