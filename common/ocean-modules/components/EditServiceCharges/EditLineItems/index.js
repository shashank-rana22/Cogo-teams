import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import CargoDetails from '../../../common/CargoDetails';

import Child from './Child';
import Header from './Header';
import styles from './styles.module.css';

function EditLineItems({
	control, showAddButtons = true, showDeleteButton = true,
	 controls = [], name = '', cargoDetails, value:emptyValue, customValues = {},
}) {
	const { fields = [], append, remove } = useFieldArray({ control, name });
	console.log({ controls, customValues, emptyValue });
	return (
		<div className={styles.container}>
			<CargoDetails primary_service={cargoDetails} />

			<Header controls={controls} />

			<div className={styles.child_container}>
				{fields?.map((field, index) => (
					<Child
						key={field.id}
						index={index}
						controls={controls}
						control={control}
						name={name}
						field={field}
						append={append}
						remove={remove}
						customValues={customValues?.formValues?.[index] || customValues?.[index]}
						showDeleteButton={showDeleteButton}
					/>
				))}
			</div>

			{showAddButtons
				? <Button onClick={() => append(emptyValue)}>+ Add Line Items</Button> : null}
		</div>
	);
}

export default EditLineItems;
