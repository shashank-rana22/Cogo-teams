import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';

function ObjectiveRequirements(props) {
	const { formRef } = props;

	const { control } = useForm({
		defaultValues: {
			service_requirements: [{}],
		},
	});

	return (
		<div ref={formRef} className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Set Objective For Lead Scoring</h3>
				<p>If no field is selected, it will automatically mean for all the inputs in that field</p>
			</div>

			<form>
				<ServiceRequirements name="service_requirements" control={control} />

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
}

export default ObjectiveRequirements;
