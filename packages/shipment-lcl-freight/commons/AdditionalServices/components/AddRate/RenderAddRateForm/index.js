import { SelectController, InputController } from '@cogoport/forms';
import UNIT_TO_PREFILL_VALUE_MAPPING from '@cogoport/ocean-modules/constants/UNIT_TO_PREFILL_VALUE_MAPPING';

import controls from './controls';
import styles from './styles.module.css';

const controlTypeMapping = {
	select : SelectController,
	text   : InputController,
	number : InputController,
};

const PREFILL_QUANTITY_ONE = 1;

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
	control = () => {},
	errors = {},
	watch = () => {},
	setValue = () => {},
	serviceData = {},
	source = '',
}) {
	const { formControl } = controls({ serviceData, source });

	let { services = [] } = serviceData || {};
	services = services?.find((service) => service.service_type === serviceData?.service_type);

	const selectedUnit = watch('unit');
	const prefillValue = UNIT_TO_PREFILL_VALUE_MAPPING?.[selectedUnit];

	setValue('quantity', services?.[prefillValue]);
	if (selectedUnit === 'per_shipment' || selectedUnit === 'per_container') {
		setValue('quantity', PREFILL_QUANTITY_ONE);
	}

	return (
		<form className={styles.form_container}>
			{formControl.map((item) => <FormElement key={item.name} control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default RenderAddRateForm;
