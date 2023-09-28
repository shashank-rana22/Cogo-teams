import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import useGetAgentScoringReportStats from './RightPanel/useGetAgentScoringReportStats';
import styles from './styles.module.css';
import useScoringReports from './useScoringReports';

function Body(props) {
	const { dateRange, entity } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const [view] = viewType.split('_');

	const [currLevel, setCurrLevel] = useState({ report_type: `${view}_report`, rm_id: null, name: null });

	const { params, setParams, debounceQuery, isChannel, setIsChannel } = useScoringReports(props);

	const { data, loading, refetch, setStatParams } = useGetAgentScoringReportStats({ params, dateRange, entity });

	return (
		<div className={styles.container}>
			<LeftPanel
				dateRange={dateRange}
				entity={entity}
				params={params}
				setParams={setParams}
				debounceQuery={debounceQuery}
				isChannel={isChannel}
				setIsChannel={setIsChannel}
				refetch={refetch}
				loading={loading}
				setStatParams={setStatParams}
				currLevel={currLevel}
				setCurrLevel={setCurrLevel}
			/>

			<RightPanel
				data={data}
				loading={loading}
				entity={entity}
				currLevel={currLevel}
			/>
		</div>

	);
}

export default Body;
