import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';

import styles from './styles.module.css';

function Child(props) {
	const { controls, control, name, index } = props;

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
						/>
					</div>

				);
			})}

			<IcMDelete />

		</div>

	);
}

export default Child;
