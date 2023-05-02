import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import { getFieldController } from '../../../../../../../common/Form/getFieldController';
import useSingleDeleteEvent from '../../../../../hooks/useSingleDeleteEvent';

import styles from './styles.module.css';

function Child(props) {
	const {
		controls, control, name, index, remove = () => {}, eventName, engagementType, editLoading = false,
	} = props;

	const { onSingleDelete } = useSingleDeleteEvent(index, remove);

	const handleDeleteObject = () => {
		if (eventName) {
			onSingleDelete(engagementType, eventName);
		} else {
			remove(index, 1);
		}
	};

	return (

		<div className={styles.list}>
			{controls.map((singleControl) => {
				const el = { ...singleControl };

				const isEventNamePrefilled = el.name === 'event_name' && eventName;
				const isDisabled = isEventNamePrefilled || editLoading;

				const Element = getFieldController(el.type);

				if (!Element) return null;

				return (
					<div className={styles.control} key={`${name}.${index}.${singleControl.name}`}>
						<Element
							key={`${name}.${index}.${singleControl.name}`}
							control={control}
							id={`create_form_${singleControl.name}_field`}
							{...singleControl}
							name={`${name}.${index}.${singleControl.name}`}
							style={{ ...singleControl.style }}
							size="sm"
							disabled={isDisabled}
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
