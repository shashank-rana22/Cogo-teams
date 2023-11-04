import { startCase, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import SCREEN_CONSTANTS from '../../../../../../constants/screen-constants';
import DateFilter from '../../../../common/DateFilter';
import PublicLeaderBoardContext from '../../../../context/PublicLeaderBoardContext';

import LocationStats from './LocationStats';
import styles from './styles.module.css';

const { COMPARISION } = SCREEN_CONSTANTS;

function PanelHeader(props) {
	const {
		screen, rank, location, additional_stats, dateRange, duration, setDuration, setDateRange,
	} = props;

	const { officeLocation } = useContext(PublicLeaderBoardContext);

	if (screen === COMPARISION && isEmpty(additional_stats)) return null;

	if (screen === COMPARISION) {
		return (
			<LocationStats
				rank={rank}
				location={location}
				additional_stats={additional_stats}
			/>
		);
	}

	return (

		<div className={styles.container}>
			<DateFilter
				dateRange={dateRange}
				duration={duration}
				setDuration={setDuration}
				setDateRange={setDateRange}
			/>
			<h3>{startCase(officeLocation)}</h3>
		</div>

	);
}
export default PanelHeader;
