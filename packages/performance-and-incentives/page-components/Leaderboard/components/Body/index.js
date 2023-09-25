import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './styles.module.css';
import useScoringReports from './useScoringReports';

function Body(props) {
	const { dateRange, entity } = props;

	const { params, setParams, debounceQuery, isChannel, setIsChannel } = useScoringReports(props);

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
			/>

			<RightPanel
				dateRange={dateRange}
				entity={entity}
				params={params}
				setParams={setParams}
			/>
		</div>

	);
}

export default Body;
