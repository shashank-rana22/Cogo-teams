import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../../../../common/Form/getFieldController';
import useSingleDeleteEvent from '../../../hooks/useSingleDeleteEvent';

import styles from './styles.module.css';

function Child(props) {
	const {
		controls, control, name, index, remove = () => {}, eventName, engagementType,
	} = props;

	const { onSingleDelete } = useSingleDeleteEvent(index, remove);

	const handleDeleteObject = () => {
		onSingleDelete(engagementType, eventName);
	};

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
							size="sm"
						/>
					</div>

				);
			})}

			<IcMDelete
				className={`form-fieldArray-${name}-remove`}
				onClick={() => handleDeleteObject()}
				style={{ cursor: 'pointer' }}
			/>

		</div>

	);
}

export default Child;
