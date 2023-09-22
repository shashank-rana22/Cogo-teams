import Body from './components/Body';
import Header from './components/Header';
import useGetScoringReports from './hooks/useGetAgentScoringReports';

export async function getServerSideProps() {
	return {
		props: {
		},
	};
}

function Leaderboard(props) {
	const {
		list,
		params,
		setParams,
		// loading,
		// refetch,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
	} = useGetScoringReports(props);

	return (
		<>
			<Header />

			<Body
				list={list}
				params={params}
				setParams={setParams}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				levelStack={levelStack}
				setLevelStack={setLevelStack}
			/>
		</>
	);
}

export default Leaderboard;
