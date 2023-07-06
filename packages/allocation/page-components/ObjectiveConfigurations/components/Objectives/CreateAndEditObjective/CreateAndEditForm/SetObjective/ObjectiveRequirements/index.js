import { useForm } from '@cogoport/forms';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import styles from './styles.module.css';

function ObjectiveRequirements() {
	const { control } = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Set Objective For Lead Scoring</h3>
				<p>If no field is selected, it will automatically mean for all the inputs in that field</p>
			</div>

			<form>
				<OrganizationalDetails control={control} />

				<AccountTransactionFunnel control={control} />
			</form>
		</div>
	);
}

export default ObjectiveRequirements;
