import FetchingLeaderboard from './common/FetchingLeaderboard';
import Body from './components/Body';
import Header from './components/Header';
import useGetLeaderboardView from './hooks/useGetLeaderboardView';

function Leaderboard() {
	const { loading, data } = useGetLeaderboardView();

	if (loading) {
		return <FetchingLeaderboard />;
	}

	if (!data) {
		return 'nothing';
	}

	return (
		<>
			<Header />

			<Body />
		</>
	);
}

export default Leaderboard;
