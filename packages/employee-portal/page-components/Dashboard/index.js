import { useState } from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import HeaderComponent from '../HeaderComponent';
import StepperComponent from '../StepperComponent';
import TabComponents from '../TabComponents';

import styles from './styles.module.css';

function Dashboard() {
	const [informationPage, setInformationPage] = useState('sign_your_docs');

	const { data, getEmployeeDetails } = useGetEmployeeDetails({
		company_policy_data_required: true,

	});

	const { detail } = data || {};
	const { name } = detail || {};

	return (
		<div className={styles.container}>
			{!informationPage && (
				<div>
					<HeaderComponent name={name} />
					<StepperComponent informationPage={informationPage} data={data} />
				</div>
			)}

			<TabComponents
				data={data}
				informationPage={informationPage}
				setInformationPage={setInformationPage}
				getEmployeeDetails={getEmployeeDetails}
			/>
		</div>
	);
}

export default Dashboard;
