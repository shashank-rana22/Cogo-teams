import { SelectController, InputController } from '@cogoport/forms';
import UNIT_VALUE_MAPPING from '@cogoport/ocean-modules/constants/UNIT_VALUE_MAPPING';

import controls from './controls';
import styles from './styles.module.css';

const PREFILL_QUANTITY_ONE = 1;

function RenderAddRateForm({
	handleSubmit = () => {},
	onSubmit = () => {},
	control = () => {},
	errors = {},
	watch = () => {},
	setValue = () => {},
	serviceData = {},
	source = '',
}) {
	const { formControl } = controls({ serviceData, source });

	const controlTypeMapping = {
		select : SelectController,
		text   : InputController,
		number : InputController,
	};

	function FormElement({ name, label, type, show, ...rest }) {
		const Element = controlTypeMapping[type];

		return Element && show ? (
			<div>
				<div className={styles.label}>{label}</div>

				<Element name={name} type={type} {...rest} />

				{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
			</div>
		) : null;
	}

	let { services = [] } = serviceData || {};
	const { service_type = '' } = serviceData || {};
	services = services?.find((service) => service?.service_type === service_type);

	const selectedUnit = watch('unit');
	const prefillValue = UNIT_VALUE_MAPPING?.[selectedUnit];
	const prefillQuantity = selectedUnit === 'per_shipment' ? PREFILL_QUANTITY_ONE : services?.[prefillValue];

	setValue('quantity', prefillQuantity);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			{formControl.map((item) => (
				<FormElement
					control={control}
					errors={errors}
					{...item}
					key={item?.name}
				/>
			))}
		</form>
	);
}

export default RenderAddRateForm;
