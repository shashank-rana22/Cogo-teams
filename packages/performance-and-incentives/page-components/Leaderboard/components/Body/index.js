import useGetScoringReports from '../../hooks/useGetAgentScoringReports';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';

function Body() {
	const {
		list,
		params,
		setParams,
		loading,
		// refetch,
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
	} = useGetScoringReports();

	return (
		<div className={styles.container}>
			<LeftPanel
				list={list}
				params={params}
				loading={loading}
				setParams={setParams}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
				levelStack={levelStack}
				currentUserData={currentUserData}
				setLevelStack={setLevelStack}
			/>

			<RightPanel />
		</div>

	);
}

export default Body;
