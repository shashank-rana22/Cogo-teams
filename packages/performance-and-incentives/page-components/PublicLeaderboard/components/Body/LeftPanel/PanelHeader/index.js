import { isEmpty } from '@cogoport/utils';

import DateFilter from '../../../../common/DateFilter';

import LocationStats from './LocationStats';

function PanelHeader(props) {
	const {
		screen, rank, location, additional_stats, dateRange, duration, setDuration, setDateRange,
	} = props;

	if (screen === 'comparison' && isEmpty(additional_stats)) return null;

	if (screen === 'comparison') {
		return (
			<LocationStats
				rank={rank}
				location={location}
				additional_stats={additional_stats}
			/>
		);
	}

	return (
		<DateFilter
			dateRange={dateRange}
			duration={duration}
			setDuration={setDuration}
			setDateRange={setDateRange}
		/>
	);
}
export default PanelHeader;
