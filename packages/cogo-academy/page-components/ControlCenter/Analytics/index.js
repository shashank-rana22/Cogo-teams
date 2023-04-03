import GraphUI from './GraphUI';
import Header from './Header';
import Tabbase from './Tabbase';

function Analytics({ setSwitchDashboard = () => {} }) {
	return (
		<>
			<Header setSwitchDashboard={setSwitchDashboard} />
			<GraphUI />
			<Tabbase />
		</>
	);
}

export default Analytics;
