import { asyncFieldsOrganization, SelectController, useGetAsyncOptions, InputController } from '@cogoport/forms';
import { merge } from '@cogoport/utils';

import controls from './controls';
import styles from './styles.module.css';

function RenderAddRateForm({
	handleSubmit = () => {},
	onSubmit = () => {},
	control,
	errors,
	serviceData = {},
}) {
	const serviceProviderEmbededOptions = useGetAsyncOptions(
		merge(asyncFieldsOrganization(), {
			params: {
				filters: {
					account_type : 'service_provider',
					kyc_status   : 'verified',
					service:
						serviceData?.service_type === 'rail_domestic_freight_service'
							? serviceData?.service_type?.split('_', 3)?.join('_')
							: serviceData?.service_type?.split('_', 2)?.join('_'),
				},
			},
		}),
	);

	const { formControl } = controls({ serviceData });

	const renderForm = (field) => {
		const { name, options, label, type, ...rest } = field;
		switch (type) {
			case 'async-select':
				return (
					<div className={styles.input_container}>
						<label>{label}</label>
						<SelectController
							name={name}
							control={control}
							options={options}
							{...rest}
							{...serviceProviderEmbededOptions}
						/>
						{errors[name] && <span>{errors[name].message}</span>}
					</div>
				);
			case 'input':
				return (
					<div className={styles.input_container}>
						<label>{label}</label>
						<InputController
							name={name}
							control={control}
							{...rest}
						/>
						{errors[name] && <span>{errors[name].message}</span>}
					</div>
				);
			case 'number':
				return (
					<div className={styles.input_container}>
						<label>{label}</label>
						<InputController
							name={name}
							control={control}
							{...rest}
						/>
						{errors[name] && <span>{errors[name].message}</span>}
					</div>
				);
			case 'select':
				return (
					<div className={styles.input_container}>
						<label>{label}</label>
						<SelectController
							name={name}
							control={control}
							options={options}
							{...rest}
						/>
						{errors[name] && <span>{errors[name].message}</span>}
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			{ formControl.map((field) => renderForm(field))}
		</form>
	);
}

export default RenderAddRateForm;
