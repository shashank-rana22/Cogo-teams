import useGetEmployeeDetails from '../../hooks/useGetEmployeeDetails';
import TabComponents from '../TabComponents';

function Dashboard() {
	const { data } = useGetEmployeeDetails({});
	return (
		<div>
			<TabComponents data={data} />
		</div>
	);
}

export default Dashboard;
