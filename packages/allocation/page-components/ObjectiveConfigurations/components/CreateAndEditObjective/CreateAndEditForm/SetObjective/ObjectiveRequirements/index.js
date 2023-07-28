import { Button } from '@cogoport/components';
import { useRef, forwardRef, useImperativeHandle } from 'react';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';
import useSetObjectiveRequirements from './useSetObjectiveReuirements';

const ObjectiveRequirements = forwardRef((props, ref) => {
	const { formValues, setFormValues, disabled, setActiveStep, generalConfigFormState } = props;

	const {
		control,
		watch,
		setValue,
		handleSubmit,
		resetForm,
		onSubmit,
		errors,
	} = useSetObjectiveRequirements({ formValues, setFormValues, setActiveStep, generalConfigFormState });

	const divRef = useRef({});

	useImperativeHandle(ref, () => ({
		container                     : divRef.current,
		resetObjectiveRequirementForm : resetForm,
	}));

	return (
		<div ref={divRef} className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Set Objective For Lead Scoring</h3>
				<p>If no field is selected, it will automatically mean for all the inputs in that field</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<ServiceRequirements
					name="service_requirements"
					control={control}
					watch={watch}
					setValue={setValue}
					formValues={formValues}
					setFormValues={setFormValues}
					disabled={disabled}
					errors={errors}
				/>

				<OrganizationalDetails
					control={control}
					watch={watch}
					setValue={setValue}
					disabled={disabled}
				/>

				<AccountTransactionFunnel
					lifecycleStage={formValues.generalConfiguration?.lifecycle_stage}
					control={control}
					disabled={disabled}
				/>

				<div className={styles.button_container}>
					<Button
						size="lg"
						type="submit"
						themeType="primary"
						disabled={disabled}
					>
						Proceed & Review
					</Button>
				</div>
			</form>
		</div>
	);
});

export default ObjectiveRequirements;
