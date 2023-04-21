import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function Child(props) {
	const { controls, control, name, index, remove = () => {} } = props;

	return (

		<div className={styles.list}>
			{controls.map((singleControl) => {
				const el = { ...singleControl };

				const Element = getFieldController(el.type);

				if (!Element) return null;

				return (
					<div className={styles.control}>
						<Element
							key={`${name}.${index}.${singleControl.name}`}
							control={control}
							id={`create_form_${singleControl.name}_field`}
							{...singleControl}
							name={`${name}.${index}.${singleControl.name}`}
							style={{ ...singleControl.style }}
						/>
					</div>

				);
			})}

			<IcMDelete
				className={`form-fieldArray-${name}-remove`}
				onClick={() => remove(index, 1)}
				style={{ cursor: 'pointer' }}
			/>

		</div>

	);
}

export default Child;
