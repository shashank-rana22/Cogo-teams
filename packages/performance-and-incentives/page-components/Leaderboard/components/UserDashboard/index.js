import Body from './Body';
import Header from './Header';

function UserDashboard(props) {
	const { setView } = props;

	return (
		<>
			<Header setView={setView} />
			<Body />
		</>
	);
}

export default UserDashboard;
