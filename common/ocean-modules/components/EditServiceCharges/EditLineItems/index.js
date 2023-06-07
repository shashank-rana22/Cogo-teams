import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import CargoDetails from '../../../common/CargoDetails';
import INCO_TERM_MAPPING from '../../../contants/INCO_TERM_MAPPING.json';

import Child from './Child';
import Header from './Header';
import styles from './styles.module.css';

function EditLineItems({
	control,
	showAddButtons = true, showDeleteButton = true, controls = [],
	name = '', cargoDetails,
	customValues = {},
	error = {},
	disabledProps = false,
	value = [],
	service_name = '',
	incoTerm = '',
}) {
	const { fields = [], append, remove } = useFieldArray({ control, name });

	const disableServiceEdit =		disabledProps && controls?.[0]?.label === 'Fcl Freight Service';

	const isBas = (value || []).some((lineItem) => lineItem?.code === 'BAS');

	const disableAddLineItem =	(service_name === 'subsidiary_service' && value.length > 0)
		|| (isBas && ['fcl_freight_service', 'lcl_freight_service'].includes(service_name)
		&& INCO_TERM_MAPPING[incoTerm] === 'export') || disableServiceEdit;

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

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
						error={error?.[index]}
						disableServiceEdit={disableServiceEdit}
					/>
				))}
			</div>

			{showAddButtons
				? (
					<Button
						size="sm"
						themeType="accent"
						onClick={() => append(childEmptyValues)}
						className={styles.button_div}
						disabled={disableAddLineItem}
					>
						+ Add Line Items
					</Button>
				) : null}
		</div>
	);
}

export default EditLineItems;
