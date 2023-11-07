import ScrollAnnouncement from '../../common/ScrollAnouncement';

import EmptyState from './common/EmptyState';
import FetchingLeaderboard from './common/FetchingLeaderboard';
import Body from './components/Body';
import Header from './components/Header';
import useGetUserProgress from './hooks/useGetUserProgress';
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

	const { kam_progress, manager_progress, getUserProgress } = useGetUserProgress();

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
			<Header
				dateRange={dateRange}
				setDateRange={setDateRange}
				entity={entity}
				setEntity={setEntity}
				kam_progress={kam_progress}
				manager_progress={manager_progress}
			/>

			<ScrollAnnouncement />

			<Body dateRange={dateRange} entity={entity} getUserProgress={getUserProgress} />
		</>
	);
}

export default Leaderboard;
