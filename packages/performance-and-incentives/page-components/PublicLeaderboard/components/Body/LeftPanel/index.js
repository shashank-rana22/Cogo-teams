import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetLeaderbordList from '../../../hooks/useGetLeaderbordList';

import PanelBody from './PanelBody';
import PanelHeader from './PanelHeader';
import styles from './styles.module.css';

function LeftPanel(props) {
	const {
		screen = 'overall',
		view = '',
		dateRange = {},
		setUpdatedAt = () => {},
		duration = 'today',
		setDuration = () => {},
		setDateRange = () => {},
		location = {},
		score = {},
		setScore = () => {},
		setNextReloadAt = () => {},
	} = props;

	const { list, loading, total_report_count: totalReportCount, additional_stats, rank } = useGetLeaderbordList({
		view,
		dateRange,
		pageLimit          : 10,
		setUpdatedAt,
		setNextReloadAt,
		office_location_id : screen === 'comparison' ? location?.value : null,
		score,
		setScore,
	});

	const [firstUser, secondUser, thirdUser, ...tableList] = list;

	const topList = [secondUser, firstUser, thirdUser].filter((item) => !isEmpty(item));

	return (
		<div className={cl`${styles.container} 
		${(screen === 'comparison' && rank !== 1) && styles.rank_two_container}`}
		>

			<PanelHeader
				screen={screen}
				rank={rank}
				location={location}
				additional_stats={additional_stats}
				dateRange={dateRange}
				duration={duration}
				setDuration={setDuration}
				setDateRange={setDateRange}
			/>

			<PanelBody
				loading={loading}
				topList={topList}
				view={view}
				screen={screen}
				tableList={tableList}
				totalReportCount={totalReportCount}
			/>

		</div>
	);
}

export default LeftPanel;
