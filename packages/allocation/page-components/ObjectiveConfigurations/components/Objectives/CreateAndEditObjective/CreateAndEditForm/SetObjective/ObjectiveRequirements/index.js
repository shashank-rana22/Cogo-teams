import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRef, forwardRef, useImperativeHandle } from 'react';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';

const ObjectiveRequirements = forwardRef((props, ref) => {
	const { formValues, setFormValues } = props;

	const divRef = useRef({});

	const { control, watch, reset, resetField } = useForm({
		defaultValues: {
			service_requirements: [{}],
		},
	});

	useImperativeHandle(ref, () => ({
		container                     : divRef.current,
		resetObjectiveRequirementForm : reset,
	}));

	return (
		<div ref={divRef} className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Set Objective For Lead Scoring</h3>
				<p>If no field is selected, it will automatically mean for all the inputs in that field</p>
			</div>

			<form>
				<ServiceRequirements
					name="service_requirements"
					control={control}
					watch={watch}
					resetField={resetField}
					formValues={formValues}
					setFormValues={setFormValues}
				/>

				<OrganizationalDetails control={control} />

				<AccountTransactionFunnel control={control} />

				<div className={styles.button_container}>
					<Button
						type="submit"
						themeType="primary"
						size="md"
					>
						Proceed & Review
					</Button>
				</div>
			</form>
		</div>
	);
});

export default ObjectiveRequirements;
