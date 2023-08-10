import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';

import getDefaultValues from '../../../utils/get-default-values';
import getControls from '../helper/getControls';

import styles from './styles.module.css';

function Rate({ data, setStep = () => {}, servicesList = [], task = {}, formattedRate = {} }) {
	const subsidiaryService = (servicesList || []).find((service) => service.service_type === 'subsidiary_service'
		&& service.id === task?.service_id);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] || ctrl.value,
	}));

	const spDefaultValues = getDefaultValues(requiredControls) || {};

	const { finalControls, defaultValues = {}, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues: { ...defaultValues, ...spDefaultValues } });
	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = formProps || {};

	const customValues = {};
	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...(formValues || {}) };

		(Object.keys(formValues || {}) || [])?.forEach((key) => {
			if (key && formValues[key] && typeof allFormValues[key] !== 'string') {
				allFormValues[key] = (allFormValues[key] || [])?.map((value) => ({
					...value,
					total    : (value.price || 0) * (value.quantity || 0),
					currency : 'INR',
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();

	Object.keys(formValues).forEach((key) => {
		customValues[key] = {
			formValues : newFormValues[key],
			id         : key,
		};
	});

	return (
		<div>
			<Layout
				control={control}
				fields={[...(requiredControls || []), ...(finalControls || [])]}
				errors={errors}
				customValues={customValues}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(2)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Rate;
