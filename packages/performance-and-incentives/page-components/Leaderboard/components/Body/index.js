import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import useGetAgentScoringReportStats from './RightPanel/useGetAgentScoringReportStats';
import styles from './styles.module.css';
import useScoringReports from './useScoringReports';

function Body(props) {
	const { dateRange, entity } = props;

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
			/>

			<RightPanel
				data={data}
				loading={loading}
			/>
		</div>

	);
}

export default Body;
