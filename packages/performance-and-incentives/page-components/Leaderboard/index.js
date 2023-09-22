import FetchingLeaderboard from './common/FetchingLeaderboard';
import Body from './components/Body';
import Header from './components/Header';
import useGetLeaderboardView from './hooks/useGetLeaderboardView';

function Leaderboard() {
	const { loading, viewData } = useGetLeaderboardView();

	if (loading) {
		return <FetchingLeaderboard />;
	}

	if (!viewData) {
		return 'nothing';
	}

	return (
		<>
			<Header />

			<Body viewData={viewData} />
		</>
	);
}

export default Leaderboard;
