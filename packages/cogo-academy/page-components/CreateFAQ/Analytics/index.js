import Header from './Header';
import Tabbase from './Tabbase';

function Analytics({ setSwitchDashboard = () => {} }) {
	return (
		<>
			<Header setSwitchDashboard={setSwitchDashboard} />

			<Tabbase />
		</>
	);
}

export default Analytics;
