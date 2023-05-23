import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import HeaderComponent from '../HeaderComponent';
import StepperComponent from '../StepperComponent';
import TabComponents from '../TabComponents';

import styles from './styles.module.css';

function Dashboard() {
	const { data } = useGetEmployeeDetails({});
	const { detail } = data || {};
	const { name } = detail || {};

	return (
		<div className={styles.container}>
			<HeaderComponent name={name} />
			<StepperComponent />
			<TabComponents data={data} />
		</div>
	);
}

export default Dashboard;
