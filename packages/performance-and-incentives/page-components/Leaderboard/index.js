import EmptyState from './common/EmptyState';
import FetchingLeaderboard from './common/FetchingLeaderboard';
import Body from './components/Body';
import Header from './components/Header';
import useGetLeaderboardView from './useGetLeaderboardView';

function Leaderboard() {
	const {
		loading,
		viewData,
		entity,
		setEntity,
		dateRange,
		setDateRange,
	} = useGetLeaderboardView();

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
			<Header dateRange={dateRange} setDateRange={setDateRange} entity={entity} setEntity={setEntity} />

			<Body dateRange={dateRange} />
		</>
	);
}

export default Leaderboard;
