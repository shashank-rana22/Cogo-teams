import { useState } from 'react';

import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import HeaderComponent from '../HeaderComponent';
import StepperComponent from '../StepperComponent';
import TabComponents from '../TabComponents';

import styles from './styles.module.css';

function Dashboard() {
	const [informationPage, setInformationPage] = useState('');

	const { data } = useGetEmployeeDetails({});
	const { detail } = data || {};
	const { name } = detail || {};

	return (
		<div className={styles.container}>
			{
				!informationPage && (
					<div>
						<HeaderComponent name={name} />
						<StepperComponent informationPage={informationPage} />
					</div>
				)
			}

			<TabComponents
				data={data}
				informationPage={informationPage}
				setInformationPage={setInformationPage}
			/>
		</div>
	);
}

export default Dashboard;
