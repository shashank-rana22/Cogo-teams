import UNIT_VALUE_MAPPING from '@cogoport/air-modules/constants/UNIT_VALUE_MAPPING';
import { cl } from '@cogoport/components';
import { SelectController, InputController, AsyncSelectController } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';

const controlTypeMapping = {
	select      : SelectController,
	text        : InputController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
};

const PREFILL_QUANTITY_ONE = 1;

function FormElement({ name, label, type, show, rules, errors, ...rest }) {
	const Element = controlTypeMapping[type];

	return Element && show ? (
		<div>
			<div className={cl`${styles.label} ${rules?.required ? styles.required_field : ''}`}>
				{label}
			</div>
			<Element name={name} type={type} {...rest} />

			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function RenderAddRateForm({
	control = () => { },
	errors = {},
	serviceData = {},
	setValue = () => {},
	watch = () => {},
	source = '',
}) {
	const { formControl } = controls({ serviceData, source });

	let { services = [] } = serviceData || {};
	const { service_type = '' } = serviceData || {};
	services = services?.find((service) => service?.service_type === service_type);

	const selectedUnit = watch('unit');
	const prefillValue = UNIT_VALUE_MAPPING[selectedUnit];
	const prefillQuantity = selectedUnit === 'per_shipment' ? PREFILL_QUANTITY_ONE : services?.[prefillValue];

	setValue('quantity', prefillQuantity);

	return (
		<form className={styles.form_container}>
			{formControl.map((item) => <FormElement key={item.name} control={control} errors={errors} {...item} />)}
		</form>
	);
}

export default RenderAddRateForm;
