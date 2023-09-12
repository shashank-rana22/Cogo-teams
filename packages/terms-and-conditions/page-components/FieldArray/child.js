import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../utlis/getFieldController';

import styles from './styles.module.css';

function Child({
	key,
	controls,
	control,
	childIndex,
	name,
	remove,
	append,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	disabled = false,
}) {
	return (
		<div className={styles.content}>
			{controls.map((controlItem, index) => {
				const Element = getFieldController(controlItem.type);
				if (!Element) return null;
				return (
					<div className={styles.list} key={name}>
						<h4>{controlItem.label}</h4>
						<Element
							key={`${name}.${childIndex}.${controlItem.name}`}
							name={`${name}.${childIndex}.${controlItem.name}`}
							width="100%"
							control={control}
							id={`create_form_${controlItem.name}_field`}
							vaule={controlItem.vaule || null}
							// {...controlItem}
						/>
					</div>
				);
			})}

			{showDeleteButton && childIndex >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(childIndex, 1)}
					style={{ width: '2em', height: '2em' }}
				/>
			) : null}
		</div>
	);
}
export default Child;
