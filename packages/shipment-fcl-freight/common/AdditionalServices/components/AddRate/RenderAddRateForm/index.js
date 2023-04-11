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
	source = 'overview',
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

	const { formControl } = controls({ serviceData, source });

	const renderForm = (ctrl) => {
		switch (ctrl.type) {
			case 'async-select':
				return (
					ctrl.show
					&& 					(
						<div className={styles.input_container}>
							<label>{ctrl.label}</label>
							<SelectController
								name={ctrl.name}
								control={control}
								size="sm"
								options={ctrl.options}
								placeholder={ctrl.placeholder}
								rules={ctrl.rules}
								{...serviceProviderEmbededOptions}
							/>
							{errors[ctrl.name] && <span>{errors[ctrl.name].message}</span>}
						</div>
					)
				);
			case 'input':
				return (
					ctrl.show
					&& 					(
						<div className={styles.input_container}>
							<label htmlFor={ctrl.name}>{ctrl.label}</label>
							<InputController
								name={ctrl.name}
								control={control}
								size="sm"
								placeholder={ctrl.placeholder}
								rules={ctrl.rules}
								disabled={source === 'task'}
							/>
							{errors[ctrl.name] && <span>{errors[ctrl.name].message}</span>}
						</div>
					)
				);
			case 'select':
				return (
					ctrl.show
					&& 						(
						<div className={styles.input_container}>
							<label>{ctrl.label}</label>
							<SelectController
								name={ctrl.name}
								control={control}
								size="sm"
								options={ctrl.options}
								placeholder={ctrl.placeholder}
								rules={ctrl.rules}
								disabled={source === 'task'}
							/>
							{errors[ctrl.name] && <span>{errors[ctrl.name].message}</span>}
						</div>
					)
				);
			default:
				return null;
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
			{ formControl.map((ctrl) => renderForm(ctrl))}
		</form>
	);
}

export default RenderAddRateForm;
