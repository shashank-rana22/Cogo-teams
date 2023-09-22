import EmptyState from './common/EmptyState';
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
		return (
			<EmptyState
				emptyText="Report Not Found"
				flexDirection="column"
				width={450}
				height={250}
				textSize={20}
			/>
		);
	}

	return (
		<>
			<Header />

			<Body />
		</>
	);
}

export default Leaderboard;
