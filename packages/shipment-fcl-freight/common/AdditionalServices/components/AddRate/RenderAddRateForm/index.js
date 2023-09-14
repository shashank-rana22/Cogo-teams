import { SelectController, InputController, AsyncSelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import controls from './controls';
import styles from './styles.module.css';

const PREFILL_QUANTITY_ONE = 1;

const controlTypeMapping = {
	select      : SelectController,
	text        : InputController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
};

function FormElement({ name, label, type, show, errors, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element && show ? (
		<div>
			<div className={styles.label}>{label}</div>

			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function RenderAddRateForm({
	control = {},
	errors = {},
	serviceData = {},
	source = '',
	watch = () => {},
	setValue = () => {},
}) {
	const { formControl = [] } = controls({ serviceData, source });

	let { services = [] } = serviceData;
	services = services.filter((service) => service.service_type === 'fcl_freight_service');

	const selectedUnit = watch('unit');
	const prefillValue = GLOBAL_CONSTANTS.selected_unit_to_prefill_value_mapping?.[selectedUnit];

	setValue('quantity', services?.[GLOBAL_CONSTANTS.zeroth_index]?.[prefillValue]);
	if (selectedUnit === 'per_shipment') {
		setValue('quantity', PREFILL_QUANTITY_ONE);
	}

	return (
		<form className={styles.form_container}>
			{formControl.map((item) => <FormElement key={item.name} control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default RenderAddRateForm;
