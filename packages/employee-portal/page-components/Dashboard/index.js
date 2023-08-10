import { useState } from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import HeaderComponent from '../HeaderComponent';
import StepperComponent from '../StepperComponent';
import TabComponents from '../TabComponents';

import styles from './styles.module.css';

function Dashboard() {
	const [informationPage, setInformationPage] = useState('');

	const { data, getEmployeeDetails, loading } = useGetEmployeeDetails({
		company_policy_data_required: true,
	});

	const { name } = data?.detail || {};

	return (
		<div className={styles.container}>
			{!informationPage && (
				<div>
					<HeaderComponent name={name} />
					<StepperComponent
						informationPage={informationPage}
						data={data}
						loading={loading}
					/>
				</div>
			)}

			<TabComponents
				data={data}
				informationPage={informationPage}
				setInformationPage={setInformationPage}
				getEmployeeDetails={getEmployeeDetails}
				getEmployeeDetailsLoading={loading}
			/>
		</div>
	);
}

export default Dashboard;
