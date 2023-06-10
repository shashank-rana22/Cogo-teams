import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';

import CargoDetails from '../../../common/CargoDetails';

import Child from './Child';
import Header from './Header';
import styles from './styles.module.css';

const CONTROLS_FIRST = 0;
const VALUE_LENGTH_GREATER_THAN = 1;
const BAS_DISABLED_SERVICE = ['fcl_freight_service', 'lcl_freight_service'];

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

	const disableServiceEdit = disabledProps && controls?.[CONTROLS_FIRST]?.label === 'Fcl Freight Service';

	const isBas = (value || []).some((lineItem) => lineItem?.code === 'BAS');

	const disableAddLineItem =	(service_name === 'subsidiary_service' && value.length > VALUE_LENGTH_GREATER_THAN)
		|| (isBas && BAS_DISABLED_SERVICE.includes(service_name)
		&& getTradeTypeByIncoTerm(incoTerm) === 'export') || disableServiceEdit;

	const CHILD_DEFAULT_VALUES = {};

	controls.forEach((controlItem) => {
		CHILD_DEFAULT_VALUES[controlItem.name] = controlItem.value || '';
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
						onClick={() => append(CHILD_DEFAULT_VALUES)}
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
